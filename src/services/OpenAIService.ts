
export async function CreateWorkoutPlan(surveyAnswers: SurveyDto | null) : Promise<ResponseDto>
{
    let plan = null;
    let counter = 0;

    while(!plan && counter < 3)
    {
        counter++;
        let aiResponse = await RequestPlanToAI(surveyAnswers);
        plan = convertToJsonObject(aiResponse);
    }

    return { code: "200", string: "", data: plan } as ResponseDto;
}

async function RequestPlanToAI(surveyAnswers: SurveyDto | null)
{
    
    try{
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "user", content: "Eres un entrenador personal con especialización en fitness y entrenamientos. Tu tarea es crear un plan de entrenamiento personalizado para mí, elaborando una lista de ejercicios con toda la información necesaria para realizarlos. Para lograr esto, utilizarás la siguiente encuesta que he respondido para darte los datos que necesitas para crear el plan de entrenamiento perfecto para mí. Ten en cuenta que el 'foco' es el enfoque que quiero darle a mi entrenamiento, y que estás creando un plan exclusivamente de entrenamiento físico, por lo que ejercicios que no impliquen movimientos físicos (como la meditación) no son aplicables aquí. Agrega 3 ejercicios para calentamiento, luego 5 ejercicios para el plan y, finalmente, 3 para estiramiento, lo que significa que SIEMPRE debe haber un total de 11 ejercicios. Las siguientes son las respuestas de la encuesta, si ves 'null', simplemente crea un plan general:\n" + JSON.stringify(surveyAnswers) + "\n. Entrégame el plan en el siguiente formato JSON, no entregues ninguna otra información: [{},{},{},...] donde '{}' son los objetos con las propiedades necesarias para realizar cada ejercicio, que son exerciseName:string (En español), equipment:string, sets:int, repetitions:int, type (si es 'calentamiento', 'entrenamiento' o 'estiramiento') y rest: int(tiempo en segundos). Es MUY importante que sigas el formato exacto para que pueda entenderlo."}
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
