import NextButtonHelper from "./helpers/NextButtonHelper"
import React from "react";
import { getSurveyQuestions, sendSurveyAnswers } from "../services/SurveyDataProvider"
import { Radio, RadioGroup, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import NavigationManager from "../services/NavigationManager";
import useAuthStore from "../stores/AuthStore";
import Loader from "./Loader";

function Question({ flag, setPercentage }: any) {

    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question | any>(null);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [error, setError] = React.useState<boolean>(false);
    const auth = useAuthStore((state: any) => state);

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
        let focus = 3;
        let answers: AnswerDto[] = questions.map((question: Question, index: number) => {
            if(index === 0) focus = question.selectedOptions ? question.selectedOptions[0] : 3;
            return {
                idQuestion: question.id,
                selectedOptions: question.selectedOptions || []
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
                console.log(auth.user);
                let answers: SurveyDto = buildQuestionsObject(updatedQuestions);
                sendSurveyAnswers(answers);
                setCurrentQuestion(null);
                auth.setSurveyAnswered(auth.user, true);
                NavigationManager.navigateTo("/home");
            }, 3000);
        }
    }

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(currentQuestion.questionType === "single-choice") 
        {
            setSelectedOptions([(event.target as HTMLInputElement).value]);
            return;
        }

        setSelectedOptions([...selectedOptions, (event.target as HTMLInputElement).value]);
    };

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
                    {error && <div className="flex flex-wrap h-full items-center mr-10 text-red-500 font-bold"><p>Selecciona una respuesta</p></div>}
                    <NextButtonHelper text="Siguiente" onclick={handleNextQuestion}/>
                </div>
            </div>}
            {!currentQuestion &&
                <div>
                    <div className="h-full">¡Listo! Estamos creando tu plan personalizado. En breve tendremos todo listo para ti.</div>
                    <div className="mt-20">
                        <Loader/>
                    </div>
                </div>
            }
        </div>
    )
}

export default Question