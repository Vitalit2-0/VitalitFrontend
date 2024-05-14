import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerHelper({ onChange, className }: { onChange: any, className?: string } ) {
    return (
        <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className={`max-w-48 ${className}`} onChange={onChange} />
            </LocalizationProvider>
        </div>
    );
}