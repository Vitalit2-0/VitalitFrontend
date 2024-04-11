export async function getSurveyQuestions(): Promise<Question[]> 
{   
    //TODO: Implement method to bring questions from API
    return [
        {
            "id": "1",
            "question": "¿Cuál es tu principal objetivo al usar Vitalit?",
            "questionType": "single-choice",
            "options": [
                "Mejorar mi condición física",
                "Adoptar una dieta más saludable",
                "Mejorar mi salud mental",
                "Todas las anteriores",
            ],
            "visible": true,
            "selectedOptions": [],
        },
        {
            "id": "2",
            "question": "¿Con qué frecuencia realizas actividades físicas cada semana?",
            "questionType": "single-choice",
            "options": [
                "No realizo actividad física",
                "1-2 días a la semana",
                "3-4 días a la semana",
                "5 días o más a la semana"
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "3",
            "question": "Selecciona tu(s) preferencia(s) dietética(s):",
            "questionType": "multiple-choice",
            "options": [
                "Sin restricciones",
                "Vegetariana",
                "Vegana",
                "Keto",
                "Paleo",
                "Baja en carbohidratos",
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "4",
            "question": "¿Tienes alguna alergia alimentaria?",
            "questionType": "single-choice",
            "options": [
                "No tengo alergias",
                "Frutos secos",
                "Gluten",
                "Lactosa",
                "Mariscos",
                "Otras"
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "5",
            "question": "¿Cómo calificarías tu estado de ánimo general en la última semana?",
            "questionType": "single-choice",
            "options": [
                "Muy malo",
                "Malo",
                "Neutral",
                "Bueno",
                "Excelente"
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "6",
            "question": "En una escala del 1 al 5, ¿cuánto estrés experimentas en una semana típica?",
            "questionType": "single-choice",
            "options": [
                "1 - Muy poco estrés",
                "2 - Poco estrés",
                "3 - Estrés moderado",
                "4 - Bastante estrés",
                "5 - Mucho estrés"
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "7",
            "question": "¿Cuántas horas de sueño obtienes en promedio por noche?",
            "questionType": "single-choice",
            "options": [
                "Menos de 4 horas",
                "4-6 horas",
                "6-8 horas",
                "Más de 8 horas"
            ],
            "visible": false,
            "selectedOptions": [],
        },
        {
            "id": "8",
            "question": "¿Practicas alguna forma de relajación o mindfulness regularmente?",
            "questionType": "multiple-choice",
            "options": [
                "No practico",
                "Meditación",
                "Yoga",
                "Ejercicios de respiración",
                "Otras formas"
            ],
            "visible": false,
            "selectedOptions": [],
        }
    ];
}

export async function sendSurveyAnswers(answers: SurveyDto): Promise<boolean>
{
    //TODO: Implement method to send answers to API
    console.log("Sending: ", answers);
    return true;
}