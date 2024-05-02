
export async function CreateWorkoutPlan(surveyAnswers: SurveyDto | null) : Promise<ResponseDto>
{
    try{
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "user", content: "You are a personal trainer with expertise in fitness and workout. Your task is to create a personalized training plan for me, creating a list of exercises with all needed information to just do it. To accomplish this, you will use the following survey that I answered to give you the data you need to create the workout plan perfect for me. Keep in mind that \"focus\" is the facus that I want to give to my trainning, and that you are creating a plan for exclusive physical training, so exercises that does not uses physical moves (like meditation) do not apply here. Add 3 exercises for warming, then 5 exercises for the plan, and finally, 3 for stretching. The following are the answers of the survey, if you see \"null\", just cerate a general plan:\n" + JSON.stringify(surveyAnswers) + "\n. Give me the plan in the following json format, no other information is needed: [{},{},{},...] where '{}' are the objects with the needed properties to accomplish each exercise, they are exerciseName, equipment, sets, repetitions, type(if is warming, workout or stretch) and rest" },
                { role: "user", content: "Eres un entrenador personal con especialización en fitness y entrenamientos. Tu tarea es crear un plan de entrenamiento personalizado para mí, elaborando una lista de ejercicios con toda la información necesaria para realizarlos. Para lograr esto, utilizarás la siguiente encuesta que he respondido para darte los datos que necesitas para crear el plan de entrenamiento perfecto para mí. Ten en cuenta que el 'foco' es el enfoque que quiero darle a mi entrenamiento, y que estás creando un plan exclusivamente de entrenamiento físico, por lo que ejercicios que no impliquen movimientos físicos (como la meditación) no son aplicables aquí. Agrega 3 ejercicios para calentamiento, luego 5 ejercicios para el plan y, finalmente, 3 para estiramiento. Las siguientes son las respuestas de la encuesta, si ves 'null', simplemente crea un plan general:\n" + JSON.stringify(surveyAnswers) + "\n. Entrégame el plan en el siguiente formato JSON, sin necesidad de otra información: [{},{},{},...] donde '{}' son los objetos con las propiedades necesarias para realizar cada ejercicio, que son exerciseName, equipment, sets, repetitions, type (si es calentamiento, entrenamiento o estiramiento) y rest."}
            ],
        };
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        });
    
        let data = await response.json();
        console.log(data);
        const workout = JSON.parse(data.choices[0].message.content)

        return { code: "200", string: "", data: workout } as ResponseDto;
    }
    catch(error: any)
    {
        return { 
            code: "500", 
            string: error, 
            data: null } as ResponseDto;
    }
    
}
