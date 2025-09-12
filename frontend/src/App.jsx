import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'

function App() {

  return (
    <>

    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/homepage" element={<HomePage/>} />

      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App
