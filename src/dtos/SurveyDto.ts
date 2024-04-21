type SurveyDto = {
    idUser: string;
    focusUser: string;
    answers: AnswerDto[];
    bornDate: Date | null;
    weight: number;
    height: number;
    imc: number;
}