import { create } from "zustand"
import { persist } from "zustand/middleware";

const useSurveyStore = create(persist(
    (set) => ({
        surveyData: null,
        setSurveyData: (surveyData: AnswerDto) => set({ surveyData: surveyData }),
    }),
    {
        name: 'survey-storage',
    }
));
export default useSurveyStore;
