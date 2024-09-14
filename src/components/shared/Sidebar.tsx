import { HiOutlineHome } from "react-icons/hi";
import { BiRun } from "react-icons/bi";
import { MdOutlineInsertChartOutlined, MdOutlineWbSunny } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import NavigationManager from "../../services/NavigationManager";
import useAuthStore from "../../stores/AuthStore";
import NotificationCenter from "./NotificationCenter";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";
import { useModal } from "./PopupAlert";
import { IoIosClose } from "react-icons/io";
import { NotificationChecker } from "../../services/NotificationChecker";

function Sidebar() {

    const [open, setOpen] = useState(false);
    const { openAddModal } = useModal();
    
    const auth = useAuthStore((state: any) => state);

    function handleLogout() {
        const checker = new NotificationChecker();
        checker.stopCheckingNotifications();
        auth.logout();
        NavigationManager.navigateTo("/login");
    }

    function handleOpenMenu() {
        setOpen(!open);
    }

    return (
        <div className={`fixed bottom-0 md:top-0 p-2 right-0 md:left-0 w-20 md:h-screen z-50 md:z-0 transition-all ${open ? "h-[600px]" : "h-0"}`}>
            <div className={`flex w-[64px] h-[64px] z-10 rounded-lg base-gradient absolute bottom-2 right-2 md:hidden items-center justify-center bg-white shadow-xl`} onClick={handleOpenMenu}>
                {open ? 
                    <IoIosClose className="text-3xl color-white base-icons cursor-pointer"/> :
                    <CiMenuFries className="text-3xl color-white base-icons cursor-pointer"/> 
                }
            </div>
            <div className={`${open ? "bg-white" : ""} relative bottom-16 md:bottom-0 flex flex-col justify-between rounded-md w-full md:h-full shadow-light p-2 transition-all`}>
                <div>
                    <div className="hidden md:block">
                        <div className="flex w-full justify-center items-center h-16">
                            <picture><img src="assets/images/logo-short.png" className="p-2" alt="" /></picture>
                        </div>
                        <hr style={{border: "solid 1px #d1d5db"}}/>
                    </div>
                    <div>
                        <Link to="/dashboard" onClick={handleOpenMenu} className="flex flex-col w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <a data-tooltip-id="dashboard-tooltip" data-tooltip-variant="light" data-tooltip-content={"Dashboard"}>
                                <HiOutlineHome className='text-3xl base-icons'/>
                            </a>
                            {/* <Tooltip id="dashboard-tooltip" place={"right"}  /> */}
                        </Link>
                        <Link to="/insights" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <a data-tooltip-id="insight-tooltip" data-tooltip-variant="light" data-tooltip-content={"Informes"}>
                                <MdOutlineInsertChartOutlined className='text-3xl base-icons'/>
                            </a>
                            {/* <Tooltip id="insight-tooltip" place={"right"}  /> */}
                        </Link>
                        <Link to="/workout" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <a data-tooltip-id="workout-tooltip" data-tooltip-variant="light" data-tooltip-content={"Salud física"}>
                                <BiRun className='text-3xl base-icons'/>
                            </a>
                            {/* <Tooltip id="workout-tooltip" place={"right"}  /> */}
                        </Link>
                        <Link to="/mental-health" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <a data-tooltip-id="mental-tooltip" data-tooltip-variant="light" data-tooltip-content={"Salud mental"}>
                                <MdOutlineWbSunny className='text-3xl base-icons'/>
                            </a>
                            {/* <Tooltip id="mental-tooltip" place={"right"}  /> */}
                        </Link>
                        <Link to="/nutrition" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <a data-tooltip-id="nutrition-tooltip" data-tooltip-variant="light" data-tooltip-content={"Nutrición"}>
                                <PiBowlFood className='text-3xl base-icons'/>
                            </a>
                            {/* <Tooltip id="nutrition-tooltip" place={"right"}  /> */}
                        </Link>
                        <div className="w-full flex items-center justify-center h-12 base-gradient text-white rounded-lg font-bold text-2xl cursor-pointer relative" onClick={() => openAddModal("goal")}>
                            +
                        </div>
                    </div>
                </div>
                <div>
                    <div className="hidden md:block">
                        <hr style={{border: "solid 1px #d1d5db"}}/>
                    </div>
                    <NotificationCenter/>
                    <Link to="/profile" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <a data-tooltip-id="profile-tooltip" data-tooltip-variant="light" data-tooltip-content={"Perfil"}>
                            <FaRegUser className='text-3xl base-icons'/>        
                        </a>
                        {/* <Tooltip id="profile-tooltip" place={"right"}  /> */}
                    </Link>
                    <Link to="/settings" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <a data-tooltip-id="settings-tooltip" data-tooltip-variant="light" data-tooltip-content={"Ajustes"}>
                            <VscSettings className='text-3xl base-icons'/>        
                        </a>
                        {/* <Tooltip id="settings-tooltip" place={"right"}  /> */}
                    </Link>
                    <div onClick={handleLogout} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <TbLogout2 className='text-3xl base-icons'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar