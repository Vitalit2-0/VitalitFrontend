import { Button } from "@mui/material"
import { AuthStateProvider } from '../services/AuthStateProvider'
import useUserStore from "../stores/userStore";

function Login({ transition } : { transition: string }) {
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

    return (
        <div className={`expandable-element ${transition} absolute top-0 right-0 flex h-screen flex-col justify-center items-center gap-2 base-gradient z-50`} transition-style="in:circle:bottom-left">
            <div className="base-white flex flex-col p-10 w-1/3 rounded-lg shadow-card">
                <Button className="btn btn-main base-gradient" variant="contained" onClick={() => handleLogin()}>Iniciar sesión</Button>
            </div>
        </div>
    )
}

export default Login