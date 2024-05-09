import {Navigate, Outlet} from 'react-router-dom'
import useAuthStore from '../../stores/AuthStore';

const isLoggedIn = () => {
    const auth = useAuthStore((state: any) => state)
    return auth.user;
}

const ProtectedRoute = () => {
    const auth = isLoggedIn()
    return auth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoute