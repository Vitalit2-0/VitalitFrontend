import React from "react";
import { Button } from "@mui/material"
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";

function Home() {

    const auth = useAuthStore((state: any) => state);

    React.useEffect(() => {
        if(!auth.user.hasAnsweredSurvey){
            setTimeout(() => {
                NavigationManager.navigateTo("/survey");
            }, 3000);
        }
    }, [])

    function handleLogout() {
        auth.logout();
        NavigationManager.navigateTo("/login");
    }

    return (
        <div>
            <div className="flex flex-col h-screen gap-2 justify-center items-center base-gray">
                <p>Home</p>
                <p>Redirigiendo a la encuesta inicial...</p>
                <Button variant="contained" className="btn btn-main" onClick={() => handleLogout()}>Cerrar sesión</Button>
            </div>
        </div>
    )
}

export default Home