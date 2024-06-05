import MonthGraph from "../components/pages/insights/MonthGraph";
import YearGraph from "../components/pages/insights/YearGraph";

function Insights() {
    return (
        <div className="min-h-screen base-gray">
            <h1 className="font-bold base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-0">Reportes</h1>
            <div className="flex flex-col gap-10 md:ps-28 sm:p-10">
                <MonthGraph />
                <YearGraph />
            </div>
        </div>
    )
}

export default Insights