export class SurveyDataProvider
{
    public async getSurveyQuestios(): Promise<Question[]> 
    {   
        //TODO: Implement method to bring questions from API
        return [
            {
                id: "1",
                question: "¿Cuáles son tus principales metas de bienestar personal para el próximo año?",
                questionType: "open-text",
                answered: false,
                visible: true,
                valid: false
            },
            {
                id: "2",
                question: "¿Qué áreas del bienestar personal te interesan más?",
                questionType: "multiple-choice",
                options: [
                    "Salud física",
                    "Nutrición y alimentación",
                    "Salud mental y bienestar emocional",
                    "Gestión del estrés y relajación",
                    "Mejora del sueño"
                ],
                answered: false,
                visible: false,
                valid: false
            },
            {
                id: "3",
                question: "En una escala del 1 al 5, ¿cuán importante es para ti el establecer hábitos saludables de vida?",
                questionType: "single-choice",
                options: [
                    "Nada importante",
                    "Poco importante",
                    "Moderadamente importante",
                    "Importante",
                    "Muy importante"
                ],
                answered: false,
                visible: false,
                valid: false
            },
            {
                id: "4",
                question: "¿Cuáles de los siguientes obstáculos has encontrado al intentar alcanzar tus metas de bienestar personal?",
                questionType: "multiple-choice",
                options: [
                    "Falta de motivación",
                    "Falta de información",
                    "Dificultad para mantener la consistencia",
                    "Falta de apoyo social",
                    "Barreras de tiempo y horario",
                    "No aplicable/otros"
                ],
                answered: false,
                visible: false,
                valid: false
            },
            {
                id: "5",
                question: "¿Qué esperas lograr con la ayuda de Vitalit en tu jornada hacia el bienestar personal?",
                questionType: "open-text",
                answered: false,
                visible: false,
                valid: false
            },
            {
                id: "6",
                question: "¿Tienes alguna condición específica de salud que quieras gestionar a través de Vitalit?",
                questionType: "multiple-choice",
                options: [
                    "No tengo condiciones específicas",
                    "Salud cardiovascular",
                    "Diabetes",
                    "Sobrepeso u obesidad",
                    "Ansiedad o depresión",
                    "Otra condición"
                ],
                answered: false,
                visible: false,
                valid: false
            },
            {
                id: "7",
                question: "¿Cuánto tiempo estás dispuesto(a) a dedicar semanalmente a actividades relacionadas con tus metas de bienestar personal?",
                questionType: "single-choice",
                options: [
                    "Prefiero especificar (campo de texto abierto)",
                    "Menos de 1 hora",
                    "1 a 3 horas",
                    "3 a 5 horas",
                    "Más de 5 horas",
                ],
                answered: false,
                visible: false,
                valid: false
            }
        ];
    }
}