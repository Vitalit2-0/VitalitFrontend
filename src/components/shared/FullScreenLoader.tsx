import { useEffect } from "react"

function FullScreenLoader({ loadingData } : { loadingData: any }) {

    useEffect(() => {
    }, [loadingData])

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen fixed top-0 right-0 left-0 bg-[rgba(0,0,0,0.7)] z-10" style={loadingData.loading ? {display: "flex"} : {display: "none"}}>
            <p className="text-center md:text-left px-10 text-white font-bold mb-5">{loadingData.message}</p>
            <div className="loader"></div>
        </div> 
    )
}

export default FullScreenLoader