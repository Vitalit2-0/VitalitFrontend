import { useEffect } from 'react'

function ExerciseImg({ src } : { src: string }) {
    
    useEffect(() => {
    }, [src])

    return (
        <img className='w-full rounded-lg absolute bottom-0' src={src} alt="" />
    )
}

export default ExerciseImg