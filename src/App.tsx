import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import RecoverPass from './pages/RecoverPass'
import Survey from './pages/Survey'
import Landing from './pages/Landing'

import { ChakraProvider } from '@chakra-ui/react'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<ChakraProvider>
                                                <Login />
                                            </ChakraProvider>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/recover" element={<RecoverPass/>}/>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/survey" element={<Survey/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        
    )
}

export default App
