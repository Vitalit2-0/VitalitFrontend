import { Button } from "@mui/material"
import { useState } from "react"

function MultipleChoiceButton({ options, onChange }: { options: string[], onChange: (option: string) => void }) {

    const [selectedOption, setSelectedOption] = useState(0);

    function handleSelectedOption(index: number) {
        setSelectedOption(index);
        onChange(options[index]);
    }

    return (
        <div className="flex gap-3">
            {Array.from(options).map((option: string, index: number) => {
                return (
                    <Button key={index} variant="contained" className={`btn btn-main w-1/${options.length} ${selectedOption === index ? "base-gradient text-white" : "base-white color-black"}`} onClick={() => handleSelectedOption(index)}>{option}</Button>
                )
            })}
        </div>
    )
}

export default MultipleChoiceButton