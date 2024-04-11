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
import Insights from './pages/Insights'
import Workout from './pages/Workout'
import MentalHealth from './pages/MentalHealth'
import Nutrition from './pages/Nutrition'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

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
                            <Route path="/dashboard" element={<Home/>}/>
                            <Route path="/insights" element={<Insights/>}/>
                            <Route path="/workout" element={<Workout/>}/>
                            <Route path="/mental-health" element={<MentalHealth/>}/>
                            <Route path="/nutrition" element={<Nutrition/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                        </Route>
                        <Route path="/survey" element={<Survey/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
        
    )
}

export default App
