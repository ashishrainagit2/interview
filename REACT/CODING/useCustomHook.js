// create custom hook to fetch data from api

import { useEffect, useState } from 'react'

/*
  Custom hook = reusable logic with useState + useEffect inside.
  Component calls useFetch(url) — gets { data, loading, error }.
*/

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // abort if user leaves page or url changes
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort() // cleanup
  }, [url]) // re-fetch when url changes

  return { data, loading, error }
}

// --- usage in a component ---

function UserProfile() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  )

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error}</p>
  return <p>{data?.name}</p>
}

export default useFetch

/*
  Why a custom hook?
  - Same fetch + loading + error logic in many components → write once
  - Component stays UI-only
  - Easy to test / swap API layer later

  Interview one-liner:
  "A custom hook extracts shared stateful logic — here fetch, loading, error, abort on unmount."
*/
