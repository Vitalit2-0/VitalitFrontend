type Question = {
    id: string;
    question: string;
    questionType: string;
    options?: string[];
    visible: boolean;
    selectedOptions?: number[];
}
