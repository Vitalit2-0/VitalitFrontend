import { useEffect, useState } from "react"
import Activity from "../components/pages/mentalHealth/Activity"
import { activities } from "../constants/mentalHealth"
import { IoIosAdd } from "react-icons/io";
import Note from "../components/pages/mentalHealth/Note";

function MentalHealth() {

    const [sortedActivities, setSortedActivities] = useState({activities: activities, currentActivity: {} as any});
    const [openNote, setOpenNote] = useState(-1);
    const [notes, setNotes] = useState<any>([]);

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        }
    }, []);

    const handleActivity = (activity:number) => {
        const updatedItems = activities.map(item => {
            return item.id === activity ? { ...item, active: true } : item
        });
        
        setSortedActivities({
            activities: updatedItems.sort((a, b) => {
                if (a.active && !b.active) { return -1; }
                if (!a.active && b.active) { return 1; }
                return 0; 
            }),
            currentActivity: activities.find(act => act.id === activity) || {}
        })
        
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    }

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
        <div className="flex flex-col min-h-screen gap-2 justify-start items-center base-gray">
                <div className="w-full p-0 sm:p-10 md:ps-28">
                    <div className={`${sortedActivities.currentActivity.title ? "w-full h-auto" : "w-0 h-0"} overflow-hidden bg-white sm:rounded-3xl shadow-md transition-all duration-1000`}>
                        <Activity key={sortedActivities.activities.findIndex(act => act.active)} active={true} activity={sortedActivities.currentActivity} handleActivity={handleActivity} />
                    </div>
                    <h2 className={`${sortedActivities.currentActivity.title ? "h-16 mt-10" : "h-0"} overflow-hidden w-full text-2xl font-bold color-dark-cyan transition-all duration-1000`}>¡Prueba una actividad diferente!</h2>
                    <div className={`flex-col lg:flex-row flex items-start w-full gap-10 relative`}>
                        <div className={`lg:w-1/2 flex flex-col gap-5 transition-all cursor-pointer`}>
                            {
                                Array.from(sortedActivities.activities).map((act, index) => {
                                    return (!act.active && 
                                        <div className={`transition-all overflow-hidden bg-white sm:rounded-3xl shadow-md`}>
                                            <Activity key={index} activity={act} handleActivity={handleActivity} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full lg:w-1/2 sticky top-10 overflow-hidden bg-white rounded-3xl shadow-md">
                            <div className={`relative left p-5 flex flex-col gap-5 max-h-[90vh] overflow-y-scroll`}>
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
                    </div>
                </div>
            </div>
        )
    }

export default MentalHealth