import { useEffect } from "react";
import MonthGraph from "../components/pages/insights/MonthGraph";
import YearGraph from "../components/pages/insights/YearGraph";
import PremiumBlock from "../components/shared/PremiumBlock";
import { VerifySession } from "../services/AuthStateProvider";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";

function Insights() {

    const auth = useAuthStore((state: any) => state);

    useEffect(() => {
        VerifyUserSession();
    }, [])

    async function VerifyUserSession() {
        const authenticated = await VerifySession(auth.user.token);
        if(!authenticated)
        {
            auth.logout();
            NavigationManager.navigateTo("/login");
        }
    }

    return (
        <div className="min-h-screen base-gray">
            <h1 className="font-bold base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-0">Reportes</h1>
            <div className="md:ps-28 sm:p-10">
                <PremiumBlock feature="Los reportes de actividad">
                    <div className="flex flex-col gap-10">
                        <MonthGraph />
                        <YearGraph />
                    </div>
                </PremiumBlock>
            </div>
        </div>
    )
}

export default Insights