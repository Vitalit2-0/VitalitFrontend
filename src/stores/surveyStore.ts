import { create } from "zustand"

const useSurveyStore = create(set => ({
    questions: [] as Question[],
    setQuestions: (questions: Question[]) => set(() => ({ questions })),
    setAnsweredQuestion: (questionId: string) => set((state: any) => ({
        questions: state.questions.map((question: any) =>
            question.id === questionId ? { ...question, valid: true } : question
        ),
    })),
}))

export default useSurveyStore;
