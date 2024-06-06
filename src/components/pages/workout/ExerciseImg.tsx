import { useEffect } from 'react'

function ExerciseImg({ src, big=false } : { src: string, big?: boolean }) {
    
    useEffect(() => {
    }, [src])

    return (
        src ? <img className={`${big ? "max-w-[1024px] absolute top-0 left-0 right-0" : "w-full"} rounded-lg`} src={src} alt="" /> :
        <div className="w-full h-full flex items-center justify-center"> Cargando imagen...</div>
    )
}

export default ExerciseImg