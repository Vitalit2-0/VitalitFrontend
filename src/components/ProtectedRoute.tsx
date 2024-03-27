import {Navigate, Outlet} from 'react-router-dom'
import useUserStore from '../stores/userStore'

const isLoggedIn = () => {
    const user = useUserStore(state => state)
    return user !== null;
}

const ProtectedRoute = () => {
    const auth = isLoggedIn()
    return auth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoute