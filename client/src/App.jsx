import { useEffect, useState } from 'react'
import './App.css'
import { gql, useQuery } from '@apollo/client'


const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`


function App() {
  const { data, loading } = useQuery(query);
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setTodos(data.getTodos)
    console.log(data.getTodos);
  }, [data])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div>
      <h1>The todos</h1>
      <ul>
        {
          todos.length > 0 && todos.map(todo => (
            <li key={todo.id} ><span>{todo.title}</span>--   (<span>{todo.user.name}</span>) -- {todo.completed ? <span style={{ color: 'green' }} >Done</span> : <span style={{ color: 'red' }} >Pending</span>} </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
