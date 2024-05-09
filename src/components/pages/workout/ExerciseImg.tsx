import { useEffect } from 'react'

function ExerciseImg({ src } : { src: string }) {
    
    useEffect(() => {
    }, [src])

    return (
        <img className='w-full rounded-lg' src={src} alt="" />
    )
}

export default ExerciseImg