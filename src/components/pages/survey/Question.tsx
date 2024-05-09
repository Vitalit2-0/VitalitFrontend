import NextButtonHelper from "../../helpers/NextButtonHelper"
import React from "react";
import { getSurveyQuestions, sendSurveyAnswers } from "../../../services/SurveyDataProvider"
import { Radio, RadioGroup, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import NavigationManager from "../../../services/NavigationManager";
import useAuthStore from "../../../stores/AuthStore";
import Loader from "../../shared/Loader";
import useSurveyStore from "../../../stores/surveyStore";
import { useModal } from "../../shared/PopupAlert";
import DatePickerHelper from "../../helpers/DatePickerHelper";
import GenderSelectHelper from "../../helpers/GenderSelectHelper";
import UserDataInputHelper from "../../helpers/UserDataInputHelper";

function Question({ flag, setPercentage }: any) {

    const [questionsData, setQuestionsData] = React.useState<
        {
            questions: Question[],
            question: Question | null, 
            index: number, 
            answer: number[],
            error: boolean
        }>
    (
        {
            questions: [],
            question: null, 
            index: -1, 
            answer: [],
            error: false
        }
    );
    
    const [userData, setUserData] = React.useState<{weight: number, height: number, imc: number, gender: string, bornDate: string | null}>({weight: 0, height: 0, imc: 0, gender: 'M', bornDate: null});
    const auth = useAuthStore((state: any) => state);
    const setSurveyData = useSurveyStore((state: any) => state.setSurveyData);
    const { openModal } = useModal();
    const { showNotification } = useModal();

    React.useEffect(() => {
        getQuestions();
    }, [flag]);

    async function getQuestions()
    {
        let response = await getSurveyQuestions(auth.user.token);
        
        if(response.code !== "200") return;

        let questions = response.data;
        if(questions.length > 0)
        {
            setQuestionsData({questions: questions, question: questions[0], index: 0, answer: [], error: false});
        }
    }

    function validQuesion()
    {
        let error = questionsData.answer.length === 0;
        setQuestionsData({...questionsData, error: error});
        return !error;
    }

    let updatedQuestions:Question[] = [];

    function registerAnswer()
    {
        updatedQuestions = questionsData.questions.map((question: Question) => {
            if (question.question_id === questionsData.question?.question_id) {
                let answers: string[] = [];

                questionsData.answer.forEach((index: number) => {
                    if(question.question_options)
                        answers.push(question.question_options[index]);
                });
                return {
                    ...question,
                    answer: (questionsData.question?.question_type === "weight-height") ? ['filled'] : answers
                };
            }
            return question;
        });
        
        setPercentage((updatedQuestions.filter((question: any) => question.answer?.length > 0).length/updatedQuestions.length)*100.0);
        setQuestionsData({questions: updatedQuestions, question: questionsData.questions[questionsData.index + 1], index: questionsData.index + 1, answer: [], error: false});
    }

    function handleNextQuestion() 
    {
        if(!validQuesion()) return;

        registerAnswer();
        endSurveyIfFinished();
    }

    function buildQuestionsObject(questions: Question[]) : SurveyDto
    {
        let focus = "";
        let answers: AnswerDto[] = questions.map((question: Question, index: number) => {
            if(index === 0) focus = (question.question_options && question.answer) ? question.answer[0] : "";
            return {
                question_id: question.question_id,
                answer: question.answer || []
            };
        });
        
        return {
            user_data: {
                focus_user: focus,
                phone_user: auth.user.phone,
                weight_user: Number(userData.weight),
                height_user: Number(userData.height),
                imc_user: userData.imc,
                gender_user: userData.gender,
                born_user: userData.bornDate || ""
            },
            answers: answers
        };
    }

    async function endSurveyIfFinished()
    {
        if(!questionsData.question) return;

        if(questionsData.question?.question_id === questionsData.questions[questionsData.questions.length - 1].question_id)
        {
            let answers: SurveyDto = buildQuestionsObject(updatedQuestions);
            console.log("answers", answers);
            let response = await sendSurveyAnswers(answers, auth.user.token);
            console.log("response", response);
            if(response.code !== "200")
            {
                showNotification("Ocurrió un error, por favor recarga la página e intenta de nuevo", "error");
                return;
            }

            setSurveyData(answers);
            setQuestionsData({questions: [], question: null, index: -1, answer: [], error: false});

            auth.setSurveyAnswered(auth.user, true);

            NavigationManager.navigateTo("/dashboard");
        }
    }

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(questionsData.question?.question_type === "single-choice") 
        {
            setQuestionsData({...questionsData, answer: [Number((event.target as HTMLInputElement).value)]});
            return;
        }
        
        setQuestionsData({...questionsData, answer: [...questionsData.answer, Number((event.target as HTMLInputElement).value)]});
    };

    async function handleSkipSurvey()
    {
        let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas saltar la encuesta? No podrás acceder a tu plan personalizado sin completarla.");
    
        if(!confirm) return;

        setSurveyData(null);
        setQuestionsData({questions: [], question: null, index: -1, answer: [], error: false});
        localStorage.setItem("skipSurvey", "true");
        NavigationManager.navigateTo("/dashboard");
    }

    function handleDateChange(e: any)
    {
        let day = e.$D < 10 ? `0${e.$D}` : e.$D;
        let month = e.$M + 1 < 10 ? `0${e.$M + 1}` : e.$M + 1;
        let year = e.$y;

        if(validateDate(day, month, year)) return;
        setUserData({...userData, bornDate: `${year}-${month}-${day}`});
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
            {questionsData.question &&
            <div className="flex flex-col gap-4 h-full">
                <p>{questionsData.question.question_text}</p>
                <div className="flex flex-col">
                {questionsData.question?.question_type !== "weight-height" &&
                    questionsData.question.question_options?.map((option: any, index: any) => {
                        return (
                            <div key={index}>
                                {questionsData.question?.question_type === "single-choice" ? (
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={questionsData.answer}
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
                {questionsData.question?.question_type === "weight-height" &&
                    <div>
                        <div className="w-full flex gap-2">
                            <UserDataInputHelper field="weight" type="number" userData={userData} setUserData={setUserData} value={userData.weight} setQuestionsData={setQuestionsData} questionsData={questionsData} label={"Peso(kg)"} min={0} max={400} />
                            <UserDataInputHelper field="height" type="number" userData={userData} setUserData={setUserData} value={userData.height} setQuestionsData={setQuestionsData} questionsData={questionsData} label={"Altura(cm)"} min={0} max={230} />
                            <UserDataInputHelper field="imc" type="number" userData={userData} setUserData={setUserData} value={userData.imc} setQuestionsData={setQuestionsData} questionsData={questionsData} label={"IMC"} min={0} max={400} disabled />
                        </div>
                        <p className="mt-5 mb-3">Fecha de nacimiento</p>
                        <div className="w-full flex gap-2">
                            <DatePickerHelper onChange={handleDateChange}/>
                            <GenderSelectHelper value={userData.gender} handleGenderSelectChange={handleGenderSelectChange}/>
                        </div>
                    </div>
                }
                </div>
                <div className="flex justify-end items-center absolute bottom-5 right-10 mt-10"> 
                    <NextButtonHelper text="Siguiente" onclick={handleNextQuestion}/>
                </div>
                <div onClick={handleSkipSurvey} className="absolute bottom-10 left-10 underline text-gray-400 hover:cursor-pointer">Saltar encuesta</div>
            </div>}
            {!questionsData.question &&
                <div>
                    <div className="h-full">¡Listo! Estamos creando tu plan personalizado. En breve tendremos todo listo para ti.</div>
                    <div className="mt-20">
                        <Loader/>
                    </div>
                </div>
            }
            {questionsData.error && <div className="flex flex-wrap absolute right-0 items-center mr-10 text-white font-bold"><p>Por favor selecciona una respuesta</p></div>}
        </div>
    )
}

export default Question