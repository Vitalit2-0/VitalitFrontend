import { useEffect, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Collapse } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import dayjs from 'dayjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from "../../../stores/AuthStore";
import { GetInsights } from "../../../services/InsightsProvider";

function MonthGraph({ dashboard = false } : { dashboard?: boolean }) {

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const user = useAuthStore((state: any) => state.user)
    const activityTypes = ['sm', 'sf'];
    const [month, setMonth] = useState(getMonth(new Date()))
    const [monthExpanded, setMonthExpanded] = useState(false);
    const [workoutData, setWorkoutData] = useState([] as any)
    const [mentalData, setMentalData] = useState([] as any)

    useEffect(() => {
        GetInsightsData();
    }, [month])

    const handleMonthChange = (data: any) => {
        setMonth(getMonth(data['$d']));
        setMonthExpanded(false);
    }

    const handleMonthExpandClick = () => {
        setMonthExpanded(!monthExpanded);
    };

    function getMonth(date: Date) {
        const monthIndex = date.getMonth();
        const monthCalendarIndex = monthIndex < 9 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;

        return {text: months[monthIndex], value: monthCalendarIndex, date: date};
    };

    const GetInsightsData = async () => {
        const currentYear = new Date().getFullYear();

        Array.from(activityTypes).forEach(async (type) => {
            const response = await GetInsights(user.token, `${month.value}-${currentYear}`, type);
    
            if(response.data) {
                const data = Array.from(response.data.activities_frecuency).map((item: any, index: number) => {
                    return {
                        name: `${response.data.activities_week[index]}`,
                        uv: item,
                        amt: item
                    }
                })
                
                type == 'sm' ? setMentalData(data) : setWorkoutData(data);
            }
        });
    }

    return (
        <div className="bg-white rounded-3xl shadow-md md:p-10 p-5">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-2xl">Reporte Mensual {dashboard ? month.text : ""}</h2>
                    {!dashboard && <div className="cursor-pointer flex items-center bg-purple-200 pl-3 rounded-lg" onClick={handleMonthExpandClick}>
                        <h3 className="font-bold text-2xl color-purple">{month.text}</h3>
                        <MdExpandMore
                            className={`text-4xl transition-all color-purple ${monthExpanded ? 'rotate-180' : ''}`}
                            aria-expanded={monthExpanded}
                            aria-label="show more"
                        />
                    </div>}
                </div>
                <Collapse in={monthExpanded} timeout="auto" unmountOnExit>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MonthCalendar 
                                onChange={handleMonthChange}
                                value={dayjs(month.date)} 
                                className="border border-solid rounded-lg mt-5"
                            />
                        </LocalizationProvider>
                    </div>
                </Collapse>
                <div className="mt-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="w-full lg:w-1/2 ">
                            <h4 className="color-purple">Actividades de Salud Mental</h4>
                            <div className="border border-solid rounded-lg pt-10 pb-5 pr-5 mt-5">
                                <ResponsiveContainer width="100%" minHeight={"260px"}>
                                    <LineChart width={600} height={300} data={mentalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 ">
                            <h4 className="color-purple">Actividades de Salud Física</h4>
                            <div className="border border-solid rounded-lg pt-10 pb-5 pr-5 mt-5">
                                <ResponsiveContainer width="100%" minHeight={"260px"}>
                                    <LineChart width={600} height={300} data={workoutData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MonthGraph