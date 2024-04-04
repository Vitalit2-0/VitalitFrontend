import {Navigate, Outlet} from 'react-router-dom'
import useUserStore from '../stores/userStore'

const isLoggedIn = () => {
    const user: User = useUserStore((state:any) => state.user)
    return user.token;
}

const ProtectedRoute = () => {
    const auth = isLoggedIn()
    return auth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoute