import axios from "axios";

export async function CreateWorkoutPlan(surveyAnswers: SurveyDto | null, place: string, recomendations: string, focus:string, token: string) : Promise<ResponseDto>
{
    let plan = null;
    let counter = 0;

    while(!plan && counter < 3)
    {
        counter++;
        let aiResponse = await RequestPlanToAI(surveyAnswers, place, recomendations, focus, token);
        console.log(aiResponse);
        plan = convertToJsonObject(aiResponse);
    }

    console.log(plan);
    return { code: "200", string: "", data: plan } as ResponseDto;
}

async function RequestPlanToAI(surveyAnswers: SurveyDto | null, place: string, recomendations: string, focus:string, token: string)
{
    let prompt = `Eres un entrenador personal con especialización en fitness y entrenamientos. Tu tarea es crear un plan de entrenamiento personalizado para mí, elaborando una lista de ejercicios con toda la información necesaria para realizarlos. 
    Para lograr esto, usarás una encuesta que he respondido para darte los datos que necesitas para crear el plan de entrenamiento perfecto para mí. Estás creando un plan exclusivamente de entrenamiento físico, por lo que ejercicios que no impliquen movimientos físicos (como la meditación) no son aplicables aquí. 
    Agrega 3 ejercicios para calentamiento, luego 5 ejercicios para el plan y, finalmente, 3 para estiramiento, lo que significa que SIEMPRE debe haber un total de 11 ejercicios. 
    Las siguientes son las respuestas de la encuesta, si ves 'null', simplemente crea un plan general: 
    ${JSON.stringify(surveyAnswers)} 
    Los únicos ejercicios que puedes usar son los que ves en la siguiente lista, es muy impotante que no agregues ejercicios que no estén en la lista:
    ${JSON.stringify(await getExercisesForAI(token))} 
    Ten en cuenta que el lugar donde se realizará el entrenamiento es ${place} y las recomendaciones son: 
    ${recomendations}.
    Entrégame el plan en el siguiente formato JSON, no entregues ninguna otra información: [{},{},{},...] donde '{}' son los objetos con las propiedades necesarias para realizar cada ejercicio, que son: 
    - exerciseName:string (En español), 
    - exerciseId: string (el valor de la propiedad exercise_id del objeto en la lista de ejercicios),
    - equipment:string, 
    - sets:int, 
    - repetitions:int, 
    - type (si es 'calentamiento', 'entrenamiento' o 'estiramiento')
    - rest: int(tiempo en segundos). 
    Es MUY importante que sigas el formato exacto para que pueda entenderlo.
    Por último, el enfoque del plan de entrenamiento es ${focus}.`;
    console.log(prompt);
    try{
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "user", content: prompt}
            ],
        };
        console.log
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        });
    
        let data = await response.json();
            
        return data.choices[0].message.content;
    }
    catch(error: any)
    {
        return { 
            code: "500", 
            string: error, 
            data: null } as ResponseDto;
    }
}

function convertToJsonObject(data: any) {
    try
    {
        return JSON.parse(data);
    }
    catch(error)
    {
        return null;
    }
}

export async function getExercisesForAI(token: string): Promise<ResponseDto>
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
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function getExercises(token: string): Promise<ResponseDto>
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/exercises`, config);
        console.log(response.data.data);
        return response.data.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function getExerciseImage(exerciseId: string, token: string): Promise<string>
{
    try {
        const response: any = await getExercises(token);
        if(!response) return "";
        
        const exercise:any = Array.from(response).find((exercise: any) => exercise.exercise_id === exerciseId);
        return exercise.exercise_image;
    } catch (error : any) {
        return "";
    }
}