import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import RecoverPass from './pages/RecoverPass'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/recover" element={<RecoverPass/>}/>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
