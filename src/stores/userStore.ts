import { create } from "zustand";

const useUserStore = create(set => ({
    user:<User> {
        id: "",
        name: "",
        email: "",
        token: "",
        username: "",
        HasAnsweredSurvey: false
    },
    setUser: set,
}));

export default useUserStore;
