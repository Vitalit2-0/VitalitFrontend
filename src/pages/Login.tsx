import { Button } from "@mui/material"
import { AuthStateProvider } from '../services/AuthStateProvider'
import NavigationButton from "../components/helpers/NavigationButton";

function Login() {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Button className="btn btn-main" variant="contained" onClick={() => handleLogin()}>Iniciar sesión</Button>
            <NavigationButton page="/register" text="Registrarme"/>
            <a onClick={() => navigateToRecover()}>¿Olvidaste tu contraseña?</a>
        </div>
    )
}

function handleLogin() {
    var auth = new AuthStateProvider();
    var user: User = auth.getUserAuthState();

    if(user)
    {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/home';
    }
}

function navigateToRecover() {
    window.location.href = '/recover';
}

export default Login