import { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import Note from "../pages/mentalHealth/Note";

function UserNotes() {

    const [openNote, setOpenNote] = useState(-1);
    const [notes, setNotes] = useState<any>([]);

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        }
    }, []);

    const handleCreateNewNote = () => {
        const newNote = {
            backgroundColor: "#ffffff",
            openColors: false,
            title: "Mi Nota",
            note: ""
        }
        setNotes([...notes, newNote]);
        setOpenNote(notes.length);
    }

    const handleDeleteNote = (index:number) => {
        const storedNotes = localStorage.getItem("notes");
        
        if (storedNotes) {
            const notes = JSON.parse(storedNotes);
            const updatedNotes = notes.filter((_:any, i:number) => i !== index);
            
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
        }
        
    }

    return (
        <div className="w-full overflow-hidden bg-white rounded-3xl shadow-md">
            <div className={`relative left p-5 flex flex-col gap-5 max-h-[90vh] overflow-y-scroll`} style={{ scrollbarWidth: "none" }}>
                <div>
                    <h1 className="text-2xl color-purple">Mis Notas</h1>
                    <p>
                        Tu espacio personal para anotar tus pensamientos y emociones.
                    </p>
                </div>
                {
                    Array.from(notes).map((_, index) => {
                        return <Note key={index} index={index} notes={notes} setOpenNote={setOpenNote} openNote={openNote} handleDeleteNote={handleDeleteNote} />
                    })
                }
                <div className="bg-gray-100 flex justify-center items-center flex-col rounded-lg p-10 cursor-pointer hover:bg-gray-200" onClick={handleCreateNewNote}>
                    <p className="color-purple">¡Crea una nueva nota!</p>
                    <IoIosAdd className="text-4xl color-purple mt-5" />
                </div>
            </div>
        </div>
    )
}

export default UserNotes