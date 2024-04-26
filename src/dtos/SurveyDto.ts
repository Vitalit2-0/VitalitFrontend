type SurveyDto = {
    user_data: {
        focus_user: string,
        phone_user: string,
        weight_user: number,
        height_user: number,
        imc_user: number,
        gender_user: string,
        born_user: string,
    }
    answers: AnswerDto[];
}