import { useEffect } from "react"

function FullScreenLoader({ loading } : { loading: boolean }) {

    useEffect(() => {
        console.log(loading);
    }, [loading])

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen fixed top-0 right-0 left-0 bg-[rgba(0,0,0,0.7)] z-10" style={loading ? {display: "flex"} : {display: "none"}}>
            <p className="text-white font-bold mb-5">Regálanos un momento. Estamos creando la rutina perfecta para ti.</p>
            <div className="loader"></div>
        </div> 
    )
}

export default FullScreenLoader