type SurveyDto = {
    user_data: {
        focus_user: string,
        phone_user: string,
        weight_user: string,
        height_user: string,
        imc_user: string,
        gender_user: string,
        born_user: Date,
    }
    answers: AnswerDto[];
}