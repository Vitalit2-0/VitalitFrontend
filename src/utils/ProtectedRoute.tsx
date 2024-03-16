import {Navigate, Outlet} from 'react-router-dom'

const isLoggedIn = () => {
    const user = localStorage.getItem('user')

    if(user)
    {
        return true
    } 
    else 
    {
        return false
    }
}

const ProtectedRoute = () => {
    const auth = isLoggedIn()
    return auth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoute