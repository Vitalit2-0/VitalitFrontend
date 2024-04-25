import NextButtonHelper from "./helpers/NextButtonHelper"
import React from "react";
import { getSurveyQuestions, sendSurveyAnswers } from "../services/SurveyDataProvider"
import { Radio, RadioGroup, FormControl, FormControlLabel, Checkbox, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import NavigationManager from "../services/NavigationManager";
import useAuthStore from "../stores/AuthStore";
import Loader from "./Loader";
import useSurveyStore from "../stores/surveyStore";
import { useModal } from "./PopupAlert";
import DatePickerHelper from "./helpers/DatePickerHelper";
import GenderSelectHelper from "./helpers/GenderSelectHelper";

function Question({ flag, setPercentage }: any) {

    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question | any>(null);
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [userData, setUserData] = React.useState<any>({});
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
        setError((selectedOptions.length == 0 && currentQuestion.questionType !== "weight-height")
                || (currentQuestion.questionType === "weight-height" && (userData.weight === 0 || userData.height === 0 || userData.bornDate === null)));
        return (selectedOptions.length > 0 || (currentQuestion.questionType === "weight-height" && (userData.weight > 0 && userData.height > 0 && userData.bornDate !== null)));
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
                    selectedOptions: (currentQuestion.questionType === "weight-height") ? [userData.weight, userData.height, userData.imc] : selectedOptions.map(Number)
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
                question_id: question.id,
                question: question.question,
                selectedOptions: question.options?.map((option: string, index: number) => question.selectedOptions?.includes(index) ? option : "").filter((option: string) => option !== "") || []
            };
        });
        console.log(auth.user)
        return {
            user_data: {
            focus_user: focus,
            phone_user: auth.user.phone,
            weight_user: userData.weight,
            height_user: userData.height,
            imc_user: userData.imc,
            gender_user: userData.gender,
            born_user: userData.bornDate?.toISOString() || ""
            },
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

                //NavigationManager.navigateTo("/dashboard");
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
        console.log(selectedOptions);
    };

    async function handleSkipSurvey()
    {
        let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas saltar la encuesta? No podrás acceder a tu plan personalizado sin completarla.");
    
        if(!confirm) return;

        setSurveyData(null);
        setCurrentQuestion(null);
        localStorage.setItem("skipSurvey", "true");
        //NavigationManager.navigateTo("/dashboard");
    }

    function handlePersonalData(event: React.ChangeEvent<HTMLInputElement>)
    {
        let value = (event.target as HTMLInputElement).value;
        let id = (event.target as HTMLInputElement).id;

        if(id === "weight-field") setUserData({...userData, weight: Number(value)});
        if(id === "height-field") setUserData({...userData, height: Number(value)});
        setUserData({...userData, imc: calculateIMC(userData.weight, userData.height)});
    }

    function calculateIMC(weight: number, height: number) : number
    {
        if (height === 0) {
            return 0;
        }
        return Math.round((weight / (height * height))*100 * 100) / 100;
    }

    function handleDateChange(e: any)
    {
        let day = e.$D;
        let month = e.$M + 1;
        let year = e.$y;

        if(validateDate(day, month, year)) return;
        setUserData({...userData, bornDate: new Date(year, month, day)});
    }

    function validateDate(day: number, month: number, year: number)
    {
        return(!day || !month || !year || year > new Date().getFullYear() || year < 1900);
    }

    function handleGenderSelectChange(event: any)
    {
        const { value } = event.target;
        setUserData({...userData, gender: value});
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
                {currentQuestion.questionType === "weight-height" &&
                    <div>
                        <div className="w-full flex gap-2">
                            <TextField className="w-1/3" id="weight-field" type="number" value={userData.weight} onInput={handlePersonalData} label="Peso (kg)" variant="outlined" inputProps={{ min: "0", max: "400", step: "1" }} />
                            <TextField className="w-1/3" id="height-field"  type="number" value={userData.height} onInput={handlePersonalData} label="Altura (cm)" variant="outlined" inputProps={{ min: "0", max: "230", step: "1" }} />
                            <TextField className="w-1/3" id="imc-field"  type="number" value={userData.imc} onInput={handlePersonalData} label="IMC" variant="outlined" inputProps={{ min: "0", max: "400", step: "1" }} disabled />
                        </div>
                        <p className="mt-5 mb-3">Fecha de nacimiento</p>
                        <div className="w-full flex gap-2">
                            <GenderSelectHelper value={userData.gender} handleGenderSelectChange={handleGenderSelectChange}/>
                            <DatePickerHelper onChange={handleDateChange}/>
                        </div>
                    </div>
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