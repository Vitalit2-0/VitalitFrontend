import { useEffect, useState } from "react";
import UserDataField from "../components/pages/survey/UserDataField"
import { Button } from "@mui/material";
import { useModal } from "../components/shared/PopupAlert";
import { FieldsValidator } from "../services/FieldsValidator";
import useAuthStore from "../stores/AuthStore";
import { translations } from "../services/TranslationsProvider";
import { calculateAge, calculateIMC } from "../services/FitCalcProvider";
import { getProfile, updateProfile } from "../services/ProfileController";
import { FaUser } from "react-icons/fa";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { GetActivityHistory } from "../services/ActivitiesServiceProvider";
import { Create } from "../services/OpenAIService";
import { NotificationService } from "../services/NotificationDataProvider";

function Profile() {
    const { showNotification, openAddModal } = useModal()
    const user = useAuthStore((state:any) => state.user)
    
    const [editProfile, setEditProfile] = useState({disabled: true, text: "Editar perfil"})
    const [userData, setUserData] = useState<User>(user)
    const [goals, setGoals] = useState<any[]>([])

    const [lastUserData, setLastUserData] = useState(userData)

    useEffect(() => {
        getProfileData();
    }, [])

    useEffect(() => {
        getActivityHistory();
    }, [])

    useEffect(() => {
        getGoals();
    }, [])

    const getProfileData = async() => {
        const response = await getProfile(user.token, user.id);

        if(response.code !== "200")
        {
            showNotification(response.string, "error");
            return;
        }
        
        const data = response.data;
        
        setUserData({...user, ...data})
        setLastUserData({...user, ...data});
    }

    const getGoals = () => {
        const goals = JSON.parse(localStorage.getItem("goals") || "[]");
        setGoals(goals);
    }

    const getActivityHistory = async() => {
        const response = await GetActivityHistory(user.token);
        console.log(response);
    }

    const handleEditProfile = () => {
        setEditProfile({disabled: !editProfile.disabled, text: editProfile.disabled ? "Guardar cambios" : "Editar perfil"})
    }

    const handleSubmitChanges = async(e: any) => {
        e.preventDefault()
        
        if(JSON.stringify(userData) === JSON.stringify(lastUserData))
        {
            handleEditProfile();
            return;
        }   

        if (!validateUser()) return;

        handleEditProfile();
    
        const data = {
            ...userData, 
            imc: calculateIMC(Number(userData.weight), Number(userData.height)),
            age: calculateAge(userData.born_date),
            weight: Number(userData.weight),
            height: Number(userData.height),
            ft_login: user.ft_login ? 1 : 0,
            survey_answered: user.survey_answered
        }

        const reponse = await updateProfile(data, user.token)

        if(reponse.code !== "200")
        {
            showNotification(reponse.string, "error");
            return;
        }

        showNotification("Perfil actualizado correctamente", "success");
        setUserData({...user, ...data})
        setLastUserData({...user, ...data});
    }

    function validateUser() : boolean {
        
        if(editProfile.disabled) return true;

        for (const field of Object.entries(userData)) {
            const isValid = FieldsValidator.validateField(field[0], field[1] as string);

            if (!isValid) {
                showNotification(`El campo ${translations[field[0] as keyof typeof translations]} no es válido${field[0] === "bornDate" ? ", debes ser mayor de edad" : ""}`, "error");
                return false;
            }
        }
        
        return true;
    }

    const handlePhotoChange = () => {
        if(editProfile.disabled) return;

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.click();

        fileInput.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files?.item(0);

            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setUserData({...userData, photo: reader.result as string});
            }
        })
    }

    const handleAdd = async(type: string) => {
        const response = await openAddModal(type);
        
        if(response.confirm) {
            const createGoal = {
                type: "goal",
                description: response.description
            }
            
            console.log(createGoal);
            const goal = await Create(createGoal, user);

            //TODO: Add goal to user in service. Service not implemented yet
            if(goal.data)
            {
                const goals = JSON.parse(localStorage.getItem("goals") || "[]");
                goals.push(goal.data);
                localStorage.setItem("goals", JSON.stringify(goals));
            }

            showNotification("Objetivo añadido correctamente", "success");
        }
    }

    return (
        <div className="base-gray min-h-screen sm:pt-5 lg:pt-10">
            <div className="md:ml-16 flex flex-col md:flex-row sm:p-5 lg:px-10 gap-5">
                <div className="md:w-1/2 xl:w-1/3">
                    <div className="bg-white h-[660px] w-full rounded-3xl shadow-md sticky top-10">
                        <div className="w-full p-10 pt-5 flex flex-col items-center sticky">
                            <div className="flex">
                                <div className="w-1/3">
                                    <div className={`m-auto w-28 h-28 bg-gray-200 rounded-full border-solid ${!editProfile.disabled ? "hover:cursor-pointer" : ""}`} onClick={handlePhotoChange}>
                                        {userData.photo ? <img className="rounded-full" src={userData.photo ? userData.photo : "assets/user.png"} alt="" /> :
                                            <div className="h-full flex items-center justify-center">
                                                <FaUser size={56} className="m-auto" />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-2/3 ml-5">
                                    <h2 className="font-bold ml-3 mt-5 text-xl">{`${user.name ? user.name : ""} ${user.lastname ? user.lastname : ""}`}</h2>
                                    <div className="flex items-center color-purple">
                                        <UserDataField 
                                            title="" 
                                            value={userData.username ? userData.username : ""} 
                                            disabled={editProfile.disabled} 
                                            handleValueChange={setUserData}
                                            field="username"
                                            type="text"
                                        />
                                        <div>
                                            {editProfile.disabled ? (userData.gender === "M" ? <IoIosMale size={30} /> : <IoIosFemale size={30} />) : 
                                                <div className="flex">
                                                    <div>
                                                        <IoIosMale size={30} className={`${userData.gender === "M" ? "base-purple text-white" : ""} p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer`} onClick={() => setUserData({...userData, gender: "M"})}/>
                                                    </div>
                                                    <div>
                                                        <IoIosFemale size={30} className={`${userData.gender === "F" ? "base-purple text-white" : ""} p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer`} onClick={() => setUserData({...userData, gender: "F"})} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="w-full mt-5" onSubmit={handleSubmitChanges}>
                                <hr />
                                <UserDataField 
                                    title="Email" 
                                    value={userData.email ? userData.email : ""} 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="email"
                                    type="text"
                                /><hr />
                                <UserDataField 
                                    title="Altura (cm)" 
                                    value={userData.height ? userData.height.toString() : ""} 
                                    disabled={editProfile.disabled} 
                                    type="number" 
                                    handleValueChange={setUserData}
                                    field="height"
                                /><hr />
                                <UserDataField 
                                    title="Peso (kg)" 
                                    value={userData.weight ? userData.weight.toString() : ""} 
                                    type="number" 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="weight"
                                /><hr />
                                <UserDataField 
                                    title="IMC" 
                                    value="23.1" 
                                    type="number" 
                                    disabled={true} 
                                    field="imc"
                                /><hr />
                                <UserDataField 
                                    title="Edad" 
                                    value="23" 
                                    type="number" 
                                    disabled={true} 
                                    field="age"
                                />
                                <UserDataField 
                                    title="Cumpleaños" 
                                    value={userData.born_date} 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="bornDate"
                                    type="date"
                                />
                                <Button className="base-purple w-full mt-5 color-white" type="submit" >{editProfile.text}</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 xl:w-2/3 flex flex-col">
                    <div className="w-full flex flex-col lg:flex-row gap-2">
                        <div className="lg:w-1/3 relative">
                        <div className="w-8 h-8 flex items-center justify-center absolute top-5 right-5 base-gradient text-white rounded-lg font-bold text-2xl cursor-pointer" onClick={() => handleAdd("objetivo")}>+</div>
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">{goals.length}</p>
                                <p className="mt-2">Objetivo{goals.length > 1 ? "s" : ""} establecido{goals.length > 1 ? "s" : ""}</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Actividades completadas</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Objetivos establecidos</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-3xl p-5 mt-5 h-full">
                        <h2 className="text-xl color-purple">Historial de actividad</h2>
                        <hr className="mt-5"/>
                        <div className="flex justify-center items-center min-h-16 h-full">No hay actividad hasta el momento</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile