// This is APP.js

import "./styles.css";
import useData from "./useData";

export default function App() {
  const { data, loading, error } = useData();

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <h2>Test!!</h2>
      {data.length > 0 && data[0].name}
    </div>
  );
}

// This is useData.js

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function useData() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiCall = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result: User[] = await res.json();
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, []);

  return { data, loading, error };
}


// https://codesandbox.io/p/sandbox/new
