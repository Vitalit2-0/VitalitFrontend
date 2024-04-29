import { useEffect, useState } from "react"
import DatePickerHelper from "./helpers/DatePickerHelper"

function UserDataField({ title, value, handleValueChange, type, disabled, field } : { title: string, value: string, type?: string, disabled: boolean, handleValueChange?: any, field: string }) {

    const [defaultValue, setDefaultValue] = useState(value)

    useEffect(() => {
        setDefaultValue(value)
    }, [disabled, value])

    const handleInputChange = (e: any) => {
        setDefaultValue(e.target.value)
        handleValueChange((prev: any) => ({ ...prev, [field]: e.target.value }))
    }

    function handleDateChange(e: any)
    {
        let day = e.$D < 10 ? `0${e.$D}` : e.$D;
        let month = e.$M + 1 < 10 ? `0${e.$M + 1}` : e.$M + 1;
        let year = e.$y;

        if(`${day}-${month}-${year}`)
        {
            handleValueChange((prev: any) => ({ ...prev, [field]: `${day}-${month}-${year}` }))
        }
    }

    return (
        <div className="w-full relative mt-2">
            <div className={`pt-1 pb-1 ps-2 pe-2 w-full flex mb-2 items-center rounded-xl ${field.includes("name") ? "" : "justify-between"}`}>
                <p className="text-lg font-bold">{title}</p>
                <div className={field.includes("name") ? "w-full" : ""}>
                    {type === "date" && 
                    <div style={{width: "196px"}}>
                        {!disabled ? <DatePickerHelper onChange={handleDateChange} className={"ms-3 w-36"} /> :
                        <input 
                            className="bg-white rounded-none border-none text-right p-0 focus:border-none focus:outline-none" 
                            style={{ height: "56px" }}
                            type={"text"}
                            disabled={disabled}
                            value={defaultValue}
                            onInput={handleInputChange}
                        />}
                    </div>}
                    {type !== "date" && 
                    <div>
                        <input 
                            className={`bg-white w-56 rounded-md p-2 mr-1 ${!disabled ? "border border-gray-300" : "border-none focus:border-none focus:outline-none"} ${field.includes("name") ? "w-full text-left" : "text-right"} ${field === "username" ? "color-purple" : ""} ${field === "name" ? "font-bold text-xl" : ""}`} 
                            type={type || "text"}
                            disabled={disabled}
                            value={defaultValue}
                            onInput={handleInputChange}
                        />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default UserDataField