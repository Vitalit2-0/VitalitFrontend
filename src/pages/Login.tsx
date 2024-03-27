import { Button } from "@mui/material"
import { AuthStateProvider } from '../services/AuthStateProvider'
import NavigationButton from "../components/helpers/NavigationButton";
import useUserStore from "../stores/userStore";

function Login() {
    const registerUser:any = useUserStore((state:any) => state.setUser);

    function setUser(User : User) 
    {
        registerUser(User);
    }

    async function handleLogin() {
        var auth = new AuthStateProvider();
        var user: User = await auth.getUserAuthState();
    
        if(user)
        {
            setUser(user);
            window.location.href = '/home';
        }
    }

    function navigateToRecover() {
        window.location.href = '/recover';
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Button className="btn btn-main" variant="contained" onClick={() => handleLogin()}>Iniciar sesión</Button>
            <NavigationButton page="/register" text="Registrarme"/>
            <a onClick={() => navigateToRecover()}>¿Olvidaste tu contraseña?</a>
        </div>
    )
}

export default Login