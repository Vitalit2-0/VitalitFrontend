import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
    (set) => ({
        user: null,
        setSurveyAnswered: (user: User, answered: boolean) => set({ user: { ...user, survey_answered: answered }}),
        login: (userData: User) => set({ user: userData }),
        logout: () => set({ user: null }),
        upgrade: (userData: User, type: string) => set({ user: {...userData, type: type} }),
    }),
    {
        name: 'auth-storage',
    }
));

export default useAuthStore;
