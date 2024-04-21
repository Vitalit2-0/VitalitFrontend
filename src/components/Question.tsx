import NextButtonHelper from "./helpers/NextButtonHelper"
import React from "react";
import { getSurveyQuestions, sendSurveyAnswers } from "../services/SurveyDataProvider"
import { Radio, RadioGroup, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import NavigationManager from "../services/NavigationManager";
import useAuthStore from "../stores/AuthStore";
import Loader from "./Loader";
import useSurveyStore from "../stores/surveyStore";
import { useModal } from "./PopupAlert";

function Question({ flag, setPercentage }: any) {

    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question | any>(null);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [error, setError] = React.useState<boolean>(false);
    const auth = useAuthStore((state: any) => state);
    const setSurveyData = useSurveyStore((state: any) => state.setSurveyData);
    const { openModal } = useModal();

    React.useEffect(() => {
        getQuestions();
    }, [flag]);

    async function getQuestions()
    {
        var questions = await getSurveyQuestions();
        
        if(questions.length > 0)
        {
            setQuestions(questions);
            setCurrentQuestion(questions.find((question: Question) => question.visible));
        }
    }

    function validQuesion()
    {
        setError(selectedOptions.length == 0);
        return (selectedOptions.length > 0);
    }

    function goNextQuestion()
    {
        let id = Number(currentQuestion?.id) + 1;
        let nextQuestion = questions.find((question: Question) => question.id == id.toString());
        setCurrentQuestion(nextQuestion);
        setSelectedOptions([]);
    }

    let updatedQuestions:Question[] = [];

    function registerAnswer()
    {
        updatedQuestions = questions.map((question: Question) => {
            if (question.id === currentQuestion.id) {
                return {
                    ...question,
                    selectedOptions: selectedOptions.map(Number)
                };
            }
            return question;
        });
        
        setPercentage((updatedQuestions.filter((question: any) => question.selectedOptions.length > 0).length/updatedQuestions.length)*100.0);
        setQuestions(updatedQuestions);
    }

    function handleNextQuestion() 
    {
        if(!validQuesion()) return;
        registerAnswer();
        goNextQuestion();
        endSurveyIfFinished();
    }

    function buildQuestionsObject(questions: Question[]) : SurveyDto
    {
        let focus = "";
        let answers: AnswerDto[] = questions.map((question: Question, index: number) => {
            if(index === 0) focus = (question.options && question.selectedOptions) ? question.options[question.selectedOptions[0]] : "";
            return {
                idQuestion: question.id,
                question: question.question,
                selectedOptions: question.options?.map((option: string, index: number) => question.selectedOptions?.includes(index) ? option : "").filter((option: string) => option !== "") || []
            };
        });
        
        return {
            idUser: auth.user.id,
            focusUser: focus,
            answers: answers
        };
    }

    function endSurveyIfFinished()
    {
        if(!currentQuestion) return;
        if(currentQuestion.id === updatedQuestions[questions.length - 1].id)
        {
            setTimeout(() => {
                let answers: SurveyDto = buildQuestionsObject(updatedQuestions);

                sendSurveyAnswers(answers);
                setSurveyData(answers);
                setCurrentQuestion(null);

                auth.setSurveyAnswered(auth.user, true);

                NavigationManager.navigateTo("/dashboard");
            }, 3000);
        }
    }

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        if(currentQuestion.questionType === "single-choice") 
        {
            setSelectedOptions([(event.target as HTMLInputElement).value]);
            console.log(selectedOptions);
            return;
        }
        
        setSelectedOptions([...selectedOptions, (event.target as HTMLInputElement).value]);
        console.log(selectedOptions);
    };

    async function handleSkipSurvey()
    {
        let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas saltar la encuesta? No podrás acceder a tu plan personalizado sin completarla.");
    
        if(!confirm) return;

        setSurveyData(null);
        setCurrentQuestion(null);
        localStorage.setItem("skipSurvey", "true");
        NavigationManager.navigateTo("/dashboard");
    }

    return (
        <div className="h-full">
            {currentQuestion &&
            <div className="flex flex-col gap-4 h-full">
                <p>{currentQuestion.question}</p>
                <div className="flex flex-col">
                {
                    currentQuestion.options?.map((option: any, index: any) => {
                        return (
                            <div key={index}>
                                {currentQuestion.questionType === "single-choice" ? (
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={selectedOptions}
                                            onChange={handleAnswerChange}
                                        >
                                            <FormControlLabel value={index} control={<Radio />} label={option} />
                                        </RadioGroup>
                                    </FormControl>
                                ) : (
                                    <FormControlLabel value={index} control={<Checkbox onChange={handleAnswerChange} />} label={option} />
                                )}
                            </div>
                        )
                    })
                }
                </div>
                <div className="flex justify-end items-center absolute bottom-5 right-10 mt-10"> 
                    <NextButtonHelper text="Siguiente" onclick={handleNextQuestion}/>
                </div>
                <div onClick={handleSkipSurvey} className="absolute bottom-10 left-10 underline text-gray-400 hover:cursor-pointer">Saltar encuesta</div>
            </div>}
            {!currentQuestion &&
                <div>
                    <div className="h-full">¡Listo! Estamos creando tu plan personalizado. En breve tendremos todo listo para ti.</div>
                    <div className="mt-20">
                        <Loader/>
                    </div>
                </div>
            }
            {error && <div className="flex flex-wrap absolute right-0 items-center mr-10 text-white font-bold"><p>Por favor selecciona una respuesta</p></div>}
        </div>
    )
}

export default Question