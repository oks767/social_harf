

import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  let navigate = useNavigate()
  return (
    <>
    <button onClick={()=> {navigate('/')}}>Зайди сюда</button>
    
    </>
  )
}

export default App
