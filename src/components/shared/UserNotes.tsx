import { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import Note from "../pages/mentalHealth/Note";
import { DeleteUserNotes, GetUserNotes, SetUserNotes } from '../../services/NotesDataProvider';
import useAuthStore from '../../stores/AuthStore';

function UserNotes() {

    const [openNote, setOpenNote] = useState(-1);
    const [notes, setNotes] = useState<Note[]>([] as Note[]);
    const user = useAuthStore((state:any) => state.user);

    useEffect(() => {
        GetNotes();
    }, []);

    async function GetNotes()
    {
        const response = await GetUserNotes(user.token, user.id);

        if (response.data) {
            setNotes(response.data);
            return;
        }

        setNotes([]);
    }

    const handleDeleteNote = async(id:string) => {
        const response = await DeleteUserNotes(user.token, id);
        
        if(response.data === 'ok')
        {
            const newNotes = notes.filter((note) => note.note_id !== id);
            setNotes(newNotes);
        }
    }

    const handleCreateNewNote = async() => {
        const newNote: Note = {
            note_background: "#ffffff",
            open_colors: false,
            note_title: "Mi Nota",
            note_text: ""
        }

        const response = await SetUserNotes(user.token, newNote);

        if(response.data)
        {
            setNotes([...notes, response.data]);
            setOpenNote(notes.length);
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
                    Array.from(notes).map((note, index) => {
                        return <Note key={index} index={index} note={note} setOpenNote={setOpenNote} openNote={openNote} handleDeleteNote={handleDeleteNote}/>
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