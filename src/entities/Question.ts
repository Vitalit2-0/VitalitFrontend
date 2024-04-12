type Question = {
    id: string;
    question: string;
    questionType: string;
    category: string;
    options?: string[];
    visible: boolean;
    selectedOptions?: number[];
}
