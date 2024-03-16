import { Button } from "@mui/material"

function Home() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <p>Home</p>
            <Button variant="contained" className="btn btn-main" onClick={() => handleLogout()}>Cerrar sesión</Button>
        </div>
    )
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '/';
}

export default Home