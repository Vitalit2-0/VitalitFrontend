import { useEffect, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Collapse } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import dayjs from 'dayjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from "../../../stores/AuthStore";
import { GetInsights } from "../../../services/InsightsProvider";

function YearGraph() {
    const user = useAuthStore((state: any) => state.user)
    const [year, setYear] = useState(getYear())
    const [yearExpanded, setYearExpanded] = useState(false);
    const [workoutYearData, setWorkoutYearData] = useState([] as any)
    const [mentalYearData, setMentalYearData] = useState([] as any)
    const activityTypes = ['sm', 'sf'];

    

    const handleYearExpandClick = () => {
        setYearExpanded(!yearExpanded);
    };

    useEffect(() => {
        GetInsightsYearData();
    }, [year])

    const GetInsightsYearData = async () => {
        Array.from(activityTypes).forEach(async (type) => {
            const response = await GetInsights(user.token, `${year.value}`, type);

            if(response.data) {
                const data = Array.from(response.data.activities_frecuency).map((item: any, index: number) => {
                    return {
                        name: `${response.data.activities_month[index]}`,
                        uv: item,
                        amt: item
                    }
                })

                type == 'sm' ? setMentalYearData(data) : setWorkoutYearData(data);
            }
        });
    }

    const handleYearChange = (data: any) => {
        setYear({text: data['$y'], value: data['$y']});
    }

    function getYear() {
        return {text: new Date().getFullYear(), value: new Date().getFullYear()};
    }

    return (
        <div className="bg-white rounded-3xl shadow-md md:p-10 p-5">
            <div className="flex items-center gap-2">
                <h2 className="font-bold text-2xl">Reporte Anual</h2>
                <div className="cursor-pointer flex items-center bg-purple-200 pl-3 rounded-lg" onClick={handleYearExpandClick}>
                    <h3 className="font-bold text-2xl color-purple">{year.text}</h3>
                    <MdExpandMore
                        className={`text-4xl transition-all color-purple ${yearExpanded ? 'rotate-180' : ''}`}
                        aria-expanded={yearExpanded}
                        aria-label="show more"
                    />
                </div>
            </div>
            <Collapse in={yearExpanded} timeout="auto" unmountOnExit>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <YearCalendar 
                            onChange={handleYearChange}
                            defaultValue={dayjs(new Date())} 
                            className="border border-solid rounded-lg mt-5"
                            maxDate={dayjs(new Date())}
                            minDate={dayjs(new Date()).subtract(2, 'year')}
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
                                <LineChart width={600} height={300} data={mentalYearData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                                <LineChart width={600} height={300} data={workoutYearData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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

export default YearGraph