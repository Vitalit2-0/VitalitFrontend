import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import RecoverPass from './pages/RecoverPass'
import Survey from './pages/Survey'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Layout from './components/Layout'

const THEME = createTheme({
    typography: {
        "fontFamily": `"Poppins", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/login/:message?" element={<Login transition='expand-animate'/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/recover" element={<RecoverPass/>}/>
                    <Route path="/" element={<ProtectedRoute/>}>
                        <Route element={<Layout/>}>
                            <Route path="/home" element={<Home/>}/>
                        </Route>
                        <Route path="/survey" element={<Survey/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
        
    )
}

export default App
