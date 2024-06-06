import { useEffect, useState } from "react";
import { IoIosColorPalette, IoIosArrowUp } from "react-icons/io";
import GradientButton from "../../helpers/GradientButton";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Note({index, setOpenNote, openNote, handleDeleteNote, notes}: {index:number, setOpenNote:any, openNote:number, handleDeleteNote:any, notes:any}) {

    const [noteState , setNoteState] = useState({
        backgroundColor: "#ffffff",
        openColors: false,
        title: "",
        note: ""
    })

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            if(JSON.parse(storedNotes)[index])
                setNoteState(JSON.parse(storedNotes)[index]);
            else
                setNoteState({
                    backgroundColor: "#ffffff",
                    openColors: false,
                    title: "",
                    note: ""
                })
        }
    }, [notes]);
    
    useEffect(() => {
        handleSaveNote();
    }, [noteState]);

    const handleColorChange = (color: string) => {
        setNoteState({
            ...noteState,
            backgroundColor: color
        })
    }

    const handleOpenNote = () => {
        handleCloseColors();
        setOpenNote(index)
    }

    const handleCloseNote = () => {
        setOpenNote(-1)
        setNoteState({
            ...noteState,
            openColors: false
        })
    }

    const handleOpenColors = () => {
        setNoteState({
            ...noteState,
            openColors: !noteState.openColors
        })
    }

    const handleCloseColors = () => {
        setNoteState({
            ...noteState,
            openColors: false
        })
    }

    const handleNoteTitleChange = (e:any) => {
        setNoteState({
            ...noteState,
            title: e.target.value
        })
    }

    const handleNoteChange = (e:any) => {
        setNoteState({
            ...noteState,
            note: e.target.value
        })
    }

    const handleSaveNote = () => {
        let notes = localStorage.getItem("notes");
        
        if (!notes) 
        {
            notes = JSON.stringify([]);
            localStorage.setItem("notes", notes);
        }

        const parsedNotes = JSON.parse(notes);
        parsedNotes[index] = noteState;
        
        localStorage.setItem("notes", JSON.stringify(parsedNotes));
    }

    return (
        <div className={`border border-solid border-gray-200 rounded-lg relative bg-[${noteState.backgroundColor}] ${openNote === index ? "" : "cursor-pointer"} ${openNote === index ? "h-auto" : "h-16"} transition-all`}>
            <div className='w-full flex justify-between items-center' >
                <div className="w-full">
                    <input 
                        className={`text-xl text-black border-none p-4 w-full bg-[${noteState.backgroundColor}] p-0 ${openNote === index ? "" : "cursor-pointer"}`} 
                        onInput={handleNoteTitleChange}
                        placeholder="Título de la Nota" 
                        value={noteState.title} 
                        onClick={handleOpenNote}
                    />
                </div>
                <div>
                    <div className="flex px-4">
                        <IoIosColorPalette className='text-2xl text-black cursor-pointer' onClick={handleOpenColors}/>
                        <RiDeleteBin6Fill className='text-2xl text-black cursor-pointer' onClick={() => handleDeleteNote(index)}/>
                    </div>
                    <div className={`absolute right-5 p-2 bg-white rounded-md shadow-lg border border-solid ${noteState.openColors ? "inline" : "hidden"}`}>
                        <div className="grid grid-cols-5 gap-1">
                            <div className="h-5 w-5 bg-[#cca1ee] cursor-pointer" onClick={() => handleColorChange("#cca1ee")}></div>
                            <div className="h-5 w-5 bg-[#a1ccee] cursor-pointer" onClick={() => handleColorChange("#a1ccee")}></div>
                            <div className="h-5 w-5 bg-[#eea1cc] cursor-pointer" onClick={() => handleColorChange("#eea1cc")}></div>
                            <div className="h-5 w-5 bg-[#eecca1] cursor-pointer" onClick={() => handleColorChange("#eecca1")}></div>
                            <div className="h-5 w-5 bg-[#a1eecc] cursor-pointer" onClick={() => handleColorChange("#a1eecc")}></div>
                            <div className="h-5 w-5 bg-[#ccf1ee] cursor-pointer" onClick={() => handleColorChange("#ccf1ee")}></div>
                            <div className="h-5 w-5 bg-[#eef1cc] cursor-pointer" onClick={() => handleColorChange("#eef1cc")}></div>
                            <div className="h-5 w-5 bg-[#cceef1] cursor-pointer" onClick={() => handleColorChange("#cceef1")}></div>
                            <div className="h-5 w-5 bg-[#f1cce9] cursor-pointer" onClick={() => handleColorChange("#f1cce9")}></div>
                            <div className="h-5 w-5 bg-[#ffffff] cursor-pointer border border-solid" onClick={() => handleColorChange("#ffffff")}></div>
                        </div>
                        <div className="mt-2">
                            <GradientButton text="Guardar" className="w-full base-gradient h-8" onClick={handleOpenColors}/>
                        </div>
                    </div>
                </div>
            </div>
            <textarea 
                onInput={handleNoteChange}
                value={noteState.note} 
                placeholder="Escribe aquí tus pensamientos e ideas" 
                className={`${openNote === index ? "min-h-[340px] p-4 " : "min-h-0 h-0"} w-full bg-[${noteState.backgroundColor}] border-none p-0 transition-all overflow-hidden`}
                onClick={handleCloseColors}
            ></textarea>
            <div className="flex justify-center cursor-pointer hover:bg-gray-200 rounded-lg" onClick={handleCloseNote}>
                <IoIosArrowUp className={`text-2xl text-black ${openNote === index ? "" : "hidden"}`}/>
            </div>
        </div>
    )
}

export default Note