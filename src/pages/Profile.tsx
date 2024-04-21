import UserDataField from "../components/UserDataField"

function Profile() {
    return (
        <div className="base-gray">
            <div className="ml-16 flex h-screen p-10 gap-5">
                <div className="w-1/3">
                    <div className="bg-white w-full h-full rounded-3xl shadow-md">
                        <div className="w-full p-10 flex flex-col items-center">
                            <div className="m-auto w-32 h-32 bg-gray-200 rounded-full border-solid border-black"><img src="" alt="" /></div>
                            <h3 className="text-2xl font-bold mt-5">Tomás Parra</h3>
                            <div className="pl-3 pr-3 pt-2 pb-2 mt-5 mb-5 border border-black rounded-md">tparra</div>
                            <UserDataField title="Edad" value="23" />
                            <UserDataField title="Altura" value="1.80 m" />
                            <UserDataField title="Peso" value="75 kg" />
                            <UserDataField title="IMC" value="23.1" />
                        </div>
                    </div>
                </div>
                <div className="w-2/3 h-full flex flex-col">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/3 pr-2">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Objetivos establecidos</p>
                            </div>
                        </div>
                        <div className="w-1/3 pr-2">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Objetivos establecidos</p>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Objetivos establecidos</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-3xl p-5 mt-5 h-full">
                        <h2 className="text-xl color-purple">Historial de actividad</h2>
                        <hr className="mt-5"/>
                        <div className="flex justify-center items-center h-full">No hay actividad hasta el momento</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile