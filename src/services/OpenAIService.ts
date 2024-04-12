
export async function CreateWorkoutPlan(surveyAnswers: SurveyDto)
{
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            { role: "user", content: "You are a personal trainer with expertise in fitness and workout. Your task is to create a personalized training plan for me, creating a list of exercises with all needed information to just do it. To accomplish this, you will use the following survey that I answered to give you the data you need to keep in mind to create the workout plan. Keep in mind that \"focus\" is the facus that I want to give to my trainning, and that you are creating a plan for  exclusive physical training, so exercises that does not uses physical moves (like meditation) do not apply here:\n" + JSON.stringify(surveyAnswers) + "\n Give me the plan in the following json format, no other information is needed: [{},{},{},...] where '{}' are the objects with the needed properties to accomplish each exercise, they are exerciseName, equipment, sets, repetitions and rest" }
        ],
    };

    console.log(apiRequestBody.messages[0].content);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + "",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
    });

    let data = await response.json();
    console.log(data);
    return data;
}
