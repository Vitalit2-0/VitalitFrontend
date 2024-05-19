import axios from "axios";

export async function GetExercises(token: string)
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/exercises`, config);
        
        let exercises = response.data.data.map((e: any) => {
            return {
                exerciseName: e.exercise_name,
                exerciseId: e.exercise_id,
            }
        })

        return exercises;
    } catch (error : any) {
        return null
    }
}