import { useEffect, useState } from 'react'
import { getExerciseImage } from '../../../services/OpenAIService';
import ExerciseImg from './ExerciseImg';
import useAuthStore from '../../../stores/AuthStore';

function ExerciseContainer( { exerciseId, next } : { exerciseId: string, next?: boolean }) {

    const [img, setImg] = useState<string>("");
    const user = useAuthStore((state: any) => state.user);

    useEffect(() => {
        handleExerciseImages();
    }, [exerciseId])

    async function handleExerciseImages()
    {
        const img = await getExerciseImage(exerciseId, user.token);
        setImg(img);
    }

    return (
        <div className={`${next ? "w-16 h-16" : "w-64"} overflow-hidden relative mr-5`}>
            <ExerciseImg src={img} />
        </div>
    )
}

export default ExerciseContainer