import { yogaPoses } from "../constants/mentalHealth";
import { getSurveyResults } from "./SurveyDataProvider";
import { GetExercises } from "./WorkoutDataProvider";

export class AiRequests {

    surveyAnswers: SurveyDto = {} as any;
    recomendations: string = "";
    description: string = "";
    exerciseList: any[] = [];
    yogaPoses: any[] = [];
    place: string = "";
    focus: string = "";
    food: string = "";
    
    async CreatePrompt(params: any, user: User)
    {
        switch(params.type)
        {
            case "workout":
                await this.GetSurvey(user);
                await this.GetExercises(user.token as string);
                this.place = params.place;
                this.recomendations = params.recomendations;
                this.focus = params.focus;
                return this.GetPrompts().workoutPlan;
            case "recipe":
                await this.GetSurvey(user);
                this.food = params.food;
                this.recomendations = params.recomendations;
                return this.GetPrompts().recipe;
            case "guided_images":
                return this.GetPrompts().guiatedImages;
            case "yoga":
                await this.GetYogaPoses();
                this.recomendations = params.recomendations;
                return this.GetPrompts().yoga;
            case "meditation":
                return this.GetPrompts().meditation;
            case "goal":
                this.description = params.description;
                return this.GetPrompts().goal;
        }
    }

    async GetExercises(token: string) {
        this.exerciseList = await GetExercises(token);
    }

    private GetPrompts() {
        return({
            guiatedImages: 
                `Crea una meditación guiada basada en una imagen. 
                La forma en que debes hacerlo es primero dar una frase que será la instrucción de lo que debe hacer la persona mientras visualiza la imagen, despues debes crear una descripción de la imagen perfecta para la instrucción.
                Entrégame la meditación en el siguiente formato JSON, no entregues ninguna otra información: 
                {
                    instruction: string (En español, detallada sobre la forma y el ritmo de la respiración, la postura y la actitud mental frente a la imagen), 
                    time: int (tiempo en segundos),
                    image_description: string (Descripción de la imagen, da instrucciones detalladas para que una IA pueda dibujarla, esta imagen debe encajar con la instrucción dada. Solicita la imagen en formato realista),
                }
                Es MUY importante que sigas el formato exacto para que pueda entenderlo.`,

            recipe: 
                `Eres un chef que se especializa en crear recetas deliciosas y saludables. Tu tarea es crear una receta para mí usando la siguiente información de una encuesta que respomdí para tener en cuenta al momento de crear el plato:
                ${JSON.stringify(this.surveyAnswers)}
                Lo que quiero cocinar es: ${this.food}.
                Ten en cuenta que la receta debe ser saludable. Además las intrucciones deben ser muy detalladas y fáciles de seguir.
                Tambien ten en cuenta las siguientes recomendaciones:
                ${this.recomendations}
                Crea la receta en español y en el siguiente formato json. Por favor envíame solo el objeto json, no envíes ninguna otra información. Es MUY importante que me envíes exactamente ese formato para entenderte:
                {
                    "title": "Recipe Name",
                    "description": "Brief description of the recipe.",
                    "prep_time": "20 minutes",
                    "cook_time": "30 minutes",
                    "total_time": "50 minutes",
                    "difficulty_level": "Easy/Medium/Hard",
                    "ingredients": [
                    {
                        "name": "Ingredient 1",
                        "quantity": "1 cup",
                        "notes": "Substitute with similar ingredient if needed"
                    },
                    {
                        "name": "Ingredient 2",
                        "quantity": "2 tablespoons",
                        "notes": "Optional"
                    }
                    ],
                    "instructions": [
                    {
                        "step_number": 1,
                        "description": "Step 1 description here."
                    },
                    {
                        "step_number": 2,
                        "description": "Step 2 description here."
                    }
                    ],
                    "nutrition_facts": {
                    "calorias": "250 kcal",
                    "proteina": "10 g",
                    "carbohidratos": "35 g",
                    "grasa": "10 g",
                    "colesterol": "30 mg",
                    "sodio": "300 mg"
                    },
                }`,

            workoutPlan:
                `Eres un entrenador personal con especialización en fitness y entrenamientos. Tu tarea es crear un plan de entrenamiento personalizado para mí, elaborando una lista de ejercicios con toda la información necesaria para realizarlos. 
                Para lograr esto, usarás una encuesta que he respondido para darte los datos que necesitas para crear el plan de entrenamiento perfecto para mí. Estás creando un plan exclusivamente de entrenamiento físico, por lo que ejercicios que no impliquen movimientos físicos (como la meditación) no son aplicables aquí. 
                Agrega 3 ejercicios para calentamiento, luego 5 ejercicios para el plan y, finalmente, 3 para estiramiento, lo que significa que SIEMPRE debe haber un total de 11 ejercicios. 
                Las siguientes son las respuestas de la encuesta, si ves 'null', simplemente crea un plan general: 
                ${JSON.stringify(this.surveyAnswers)} 
                Los únicos ejercicios que puedes usar son los que ves en la siguiente lista, es muy impotante que no agregues ejercicios que no estén en la lista:
                ${JSON.stringify(this.exerciseList)} 
                Ten en cuenta que el lugar donde se realizará el entrenamiento es ${this.place} y las recomendaciones son: 
                ${this.recomendations}.
                Entrégame el plan en el siguiente formato JSON, no entregues ninguna otra información: [{},{},{},...] donde '{}' son los objetos con las propiedades necesarias para realizar cada ejercicio, que son: 
                - exerciseName:string (En español), 
                - exerciseId: string (el valor de la propiedad exercise_id del objeto en la lista de ejercicios),
                - equipment:string, 
                - sets:int, 
                - repetitions:int, 
                - type (si es 'calentamiento', 'entrenamiento' o 'estiramiento')
                - rest: int(tiempo en segundos). 
                Es MUY importante que sigas el formato exacto para que pueda entenderlo.
                Por último, el enfoque del plan de entrenamiento es ${this.focus}.
                Para fines de pruebas, por ahora por todos los rest en 0.`,

            yoga:
                `Eres un instructor de yoga que se especializa en la creación de secuencias de yoga. Tu tarea es crear una secuencia de yoga de 5 posturas para mí.
                Las siguientes son las posturas de yoga que puedes usar en la secuencia, es muy importante que no agregues posturas que no estén en la lista: 
                ${JSON.stringify(this.yogaPoses)} 
                Ten en cuenta que las recomendaciones para la secuencia son: 
                ${this.recomendations}.
                Crea la secuencia en el siguiente formato JSON, no entregues ninguna otra información: [{},{},{},...] donde '{}' son los objetos con las propiedades necesarias para realizar cada postura, las propiedades deben ser exactamente las mismas que las que se muestran en cada objeto en la lista de posturas de yoga.
                Es MUY importante que sigas el formato exacto para que pueda entenderlo.`,

            meditation:
                `Crea una meditación mundfulness guiada para mí. Debes crear con 5 instrucciones diferentes que sirvan para relajarme y concentrarme en el presente. Deben estar enfocadas en la relajación y la paz interior. 
                La meditación debe ser en español y debe ser fácil de seguir. 
                Por favor, envíame la meditación en el siguiente formato JSON, no envíes ninguna otra información: 
                [
                    "instruction1" string (En español, detallada sobre la forma y el ritmo de la respiración, la postura y la actitud mental),
                    "instruction2" string (En español, detallada sobre la forma y el ritmo de la respiración, la postura y la actitud mental),
                    ...
                ]
                Es MUY importante que sigas el formato exacto para que pueda entenderlo.`,

            goal:
                `Crea un objetivo de bienestar para mí de acuerdo a la siguiente descripción:
                ${JSON.stringify(this.description)} 
                Debes crear un objetivo que sea específico, medible y alcanzable. 
                Por favor, envíame el objetivo en el siguiente formato JSON, no envíes ninguna otra información: 
                {
                    "goal": string (En español, el título que consideres adecuado para el objetivo),
                    "currently_achieved": int (Número que representa el progreso actual del objetivo),
                    "target": int (Número que representa el objetivo final),
                    "unit": string (Unidad de medida del objetivo. Puede ser 'minutos', 'veces', 'días', 'kilogramos', 'porcentaje', etc.),
                    "deadline": string (Fecha límite para alcanzar el objetivo si la hay, en formato 'dd/mm/aaaa'),
                    "repeat": string (Frecuencia con la que se debe realizar la acción para alcanzar el objetivo. Puede ser 'diariamente', 'semanalmente', 'mensualmente', etc.)
                }
                Es MUY importante que sigas el formato exacto para que pueda entenderlo.`
        })
    }

    private async GetSurvey(user: User) {
        const response = await getSurveyResults(user);
        this.surveyAnswers = response.data;
    }

    private async GetYogaPoses() {
        this.yogaPoses = yogaPoses
    }
}