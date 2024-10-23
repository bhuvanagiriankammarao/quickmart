import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './pages/signup';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1 className=" font-poppins text-black  text-custom-16 font-500">
      Hello ankamrao
    </h1>
    </>
  )
}

export default App
