import { useEffect, useState } from "react";
import { IoIosColorPalette, IoIosArrowUp } from "react-icons/io";
import GradientButton from "../../helpers/GradientButton";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { UpdateUserNotes } from "../../../services/NotesDataProvider";
import useAuthStore from "../../../stores/AuthStore";

function Note({index, setOpenNote, openNote, note, handleDeleteNote}: {index:number, setOpenNote:any, openNote:number, note:Note, handleDeleteNote:any }) {

    const user = useAuthStore((state:any) => state.user);
    const [noteState , setNoteState] = useState(note as Note)

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        handleSaveNote();
    }, [noteState]);

    const handleColorChange = (color: string) => {
        setNoteState({
            ...noteState,
            note_background: color
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
            open_colors: false
        })
    }

    const handleOpenColors = () => {
        setNoteState({
            ...noteState,
            open_colors: !noteState.open_colors
        })
    }

    const handleCloseColors = () => {
        setNoteState({
            ...noteState,
            open_colors: false
        })
    }

    const handleNoteTitleChange = (e:any) => {
        setNoteState({
            ...noteState,
            note_title: e.target.value
        })
    }

    const handleNoteChange = (e:any) => {
        setNoteState({
            ...noteState,
            note_text: e.target.value
        })
    }

    let saving: boolean = false;
    const handleSaveNote = async() => {

        if(note && !saving) 
        {
            saving = true;
            const response = await UpdateUserNotes(user.token, noteState);
            
            if(response.data === 'ok')
            {
                saving = false;
            }
        }
    }

    return (
        <div className={`border border-solid border-gray-200 rounded-lg relative bg-[${noteState.note_background}] ${openNote === index ? "" : "cursor-pointer"} ${openNote === index ? "h-auto" : "h-16"} transition-all`}>
            <div className='w-full flex justify-between items-center' >
                <div className="w-full">
                    <input 
                        className={`text-xl text-black border-none p-4 w-full bg-[${noteState.note_background}] p-0 ${openNote === index ? "" : "cursor-pointer"}`} 
                        onChange={handleNoteTitleChange}
                        placeholder="Título de la Nota" 
                        value={noteState.note_title} 
                        onClick={handleOpenNote}
                    />
                </div>
                <div>
                    <div className="flex px-4">
                        <IoIosColorPalette className='text-2xl text-black cursor-pointer' onClick={handleOpenColors}/>
                        <RiDeleteBin6Fill className='text-2xl text-black cursor-pointer' onClick={() => handleDeleteNote(note.note_id)}/>
                    </div>
                    <div className={`absolute right-5 p-2 bg-white z-10 rounded-md shadow-lg border border-solid ${noteState.open_colors ? "inline" : "hidden"}`}>
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
                onChange={handleNoteChange}
                value={noteState.note_text} 
                placeholder="Escribe aquí tus pensamientos e ideas" 
                className={`${openNote === index ? "min-h-[340px] p-4 " : "min-h-0 h-0"} w-full bg-[${noteState.note_background}] border-none p-0 transition-all overflow-hidden`}
                onClick={handleCloseColors}
            ></textarea>
            <div className="flex justify-center cursor-pointer hover:bg-gray-200 rounded-lg" onClick={handleCloseNote}>
                <IoIosArrowUp className={`text-2xl text-black ${openNote === index ? "" : "hidden"}`}/>
            </div>
        </div>
    )
}

export default Note