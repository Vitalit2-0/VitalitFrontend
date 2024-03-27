import React from "react";
import { Button } from "@mui/material"
import useUserStore from "../stores/userStore";

function Home() {

    const hasAnsweredSurvey = useUserStore((state: any) => state.user.HasAnsweredSurvey);

    React.useEffect(() => {
        if(!hasAnsweredSurvey){
            window.location.href = '/survey';
        }
    }, [])

    function handleLogout() {
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <p>Home</p>
            <Button variant="contained" className="btn btn-main" onClick={() => handleLogout()}>Cerrar sesión</Button>
        </div>
    )
}

export default Home