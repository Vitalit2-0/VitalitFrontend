import { ChakraProvider, Checkbox, Textarea } from "@chakra-ui/react"
import NextButtonHelper from "./helpers/NextButtonHelper"
import React from "react";
import { SurveyDataProvider } from "../services/SurveyDataProvider"
import { Radio, RadioGroup, FormControl, FormControlLabel } from "@mui/material";

function Question({ flag, setPercentage }: any) {

    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question | any>(null);

    React.useEffect(() => {
        getQuestions();
    }, [flag]);

    async function getQuestions()
    {
        var survey = new SurveyDataProvider();
        var questions = await survey.getSurveyQuestios();

        if(questions.length > 0)
        {
            setQuestions(questions);
            setCurrentQuestion(questions.find((question: Question) => question.visible));
        }
    }

    function handleNextQuestion() 
    {
        let id = Number(currentQuestion?.id) + 1;
        let nextQuestion = questions.find((question: Question) => question.id == id.toString());
        
        let updatedQuestions = questions.map((question: Question) => {
            if (question.id === currentQuestion.id) {
                return {
                    ...question,
                    valid: true
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
        setCurrentQuestion(nextQuestion);
        console.log((updatedQuestions));
        setPercentage((updatedQuestions.filter((question: any) => question.valid).length/updatedQuestions.length)*100.0);
    }

    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <div className="h-full">
            {currentQuestion &&
            <div className="flex flex-col gap-4 h-full">
                <p>{currentQuestion.question}</p>
                {currentQuestion.questionType === "open-text" && <Textarea placeholder='Here is a sample placeholder'/>}
                <div className="flex flex-col gap-2">
                {
                    currentQuestion.options?.map((option: any, index: any) => {
                        return (
                            <div key={index}>
                                {currentQuestion.id === "3" || currentQuestion.id === "7" ? (
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value={index} control={<Radio />} label={option} />
                                        </RadioGroup>
                                    </FormControl>
                                ) : (
                                    <Checkbox key={index}>{option}</Checkbox>
                                )}
                            </div>
                        )
                    })
                }
                </div>
                <div className="flex justify-end absolute bottom-5 right-10"> 
                    <NextButtonHelper text="Siguiente" className="mt-10" onclick={handleNextQuestion}/>
                </div>
            </div>}
            {!currentQuestion && <div className="h-full">¡Listo! Estamos creando tu plan personalizado. En breve tendremos todo listo para ti.</div>}
        </div>
    )
}

export default Question