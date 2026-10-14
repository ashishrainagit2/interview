// Create a simple react component that displays a list of items

// const users = [
//     { id: 1, name: "Amit Sharma", role: "Developer" },
//     { id: 2, name: "Priya Patil", role: "Designer" },
//     { id: 3, name: "Rahul Joshi", role: "Product Manager" },
//     { id: 4, name: "Sneha Kulkarni", role: "Developer" },
//     { id: 5, name: "Vikram Shah", role: "QA Engineer" }
//   ];

  //it should have search, loading and null result


import React, { useEffect, useState } from 'react'

const users = [
  { id: 1, name: "Amit Sharma", role: "Developer" },
  { id: 2, name: "Priya Patil", role: "Designer" },
  { id: 3, name: "Rahul Joshi", role: "Product Manager" },
  { id: 4, name: "Sneha Kulkarni", role: "Developer" },
  { id: 5, name: "Vikram Shah", role: "QA Engineer" }
];

function App() {
  const [search, setSearch] = useState('')
  const [filteredValue, setFilteredValue] = useState(users)
  const [loading, setLoading] = useState(false)

  const changeHandler = (e) => {
    setSearch(e.target.value)
  }

  // fake API: wait, then filter. clearTimeout cancels the previous search.
  useEffect(() => {
    setLoading(true)

    const id = setTimeout(() => {
      const updatedSearch = search.toLowerCase()
      const result = users.filter((item) =>
        item.name.toLowerCase().includes(updatedSearch)
      )
      setFilteredValue(result)
      setLoading(false)
    }, 500)

    return () => clearTimeout(id)
  }, [search])

  return (
    <div>
      <div>
        <input type="text" onChange={changeHandler} value={search} />
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : filteredValue.length === 0 ? (
            <p>No results</p>
          ) : (
            filteredValue.map((item) => (
              <div key={item.id} style={{ border: '1px solid grey' }}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.role}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App


// https://onecompiler.com/react/4544u6wwp
