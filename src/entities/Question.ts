type Question = {
    id: string;
    question: string;
    questionType: string;
    options?: string[];
    answer?: string;
    answered: boolean;
    visible: boolean;
    valid: boolean;
}
