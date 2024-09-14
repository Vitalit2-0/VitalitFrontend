import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function CollapseItem({ title, text } : { title: string, text: string }) {
    
    const [open, setOpen] = useState(false);
    
    return (
        <div className="border border-gray-200 p-5 shadow-md mt-5">
            <div onClick={() => setOpen(!open)} className='w-full text-left font-medium text-lg cursor-pointer flex justify-between'>
                <p>{title}</p>
                {open ? <MdKeyboardArrowUp className='text-2xl'/> : <MdKeyboardArrowDown className='text-2xl'/>}
            </div>
            <div className={`${open ? "h-auto" : "h-0"} transition-all overflow-hidden`}>
                <p className='mt-2'>{text}</p>
            </div>
        </div>
    )
}

export default CollapseItem