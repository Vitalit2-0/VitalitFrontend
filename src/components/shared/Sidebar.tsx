import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { BiRun } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import NavigationManager from "../../services/NavigationManager";
import useAuthStore from "../../stores/AuthStore";
import NotificationCenter from "./NotificationCenter";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

function Sidebar() {

    const [open, setOpen] = useState(false);

    const auth = useAuthStore((state: any) => state);

    function handleLogout() {
        auth.logout();
        NavigationManager.navigateTo("/login");
    }

    function handleOpenMenu() {
        setOpen(!open);
    }

    return (
        <div className={`fixed bottom-0 md:top-0 p-2 right-0 md:left-0 w-20 md:h-screen md:z-50 transition-all ${open ? "h-[600px]" : "h-0"}`}>
            <div className={`${open ? "hidden" : "block md:hidden"} w-[64px] h-[64px] rounded-lg base-gradient absolute bottom-2 right-2 flex items-center justify-center bg-white shadow-xl`} onClick={handleOpenMenu}>
                <IoIosArrowUp className="text-3xl color-white base-icons cursor-pointer"/>
            </div>
            <div className={`bg-white  bottom-0 flex flex-col justify-between rounded-md w-full md:h-full shadow-light p-2 transition-all`}>
                <div>
                    <div className="hidden md:block">
                        <div className="flex w-full justify-center items-center h-16">
                            <picture><img src="assets/images/logo-short.png" className="p-2" alt="" /></picture>
                        </div>
                        <hr style={{border: "solid 1px #d1d5db"}}/>
                    </div>
                    <div>
                        <Link to="/dashboard" onClick={handleOpenMenu} className="flex flex-col w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <HiOutlineHome className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/insights" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <MdOutlineInsertChartOutlined className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/workout" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <BiRun className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/mental-health" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <MdOutlineWbSunny className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/nutrition" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <PiBowlFood className='text-3xl base-icons'/>
                        </Link>
                        <div className="w-full flex items-center justify-center h-12 base-gradient text-white rounded-lg font-bold text-2xl cursor-pointer">+</div>
                    </div>
                </div>
                <div>
                    <div className="hidden md:block">
                        <hr style={{border: "solid 1px #d1d5db"}}/>
                    </div>
                    <NotificationCenter/>
                    <Link to="/profile" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <FaRegUser className='text-3xl base-icons'/>        
                    </Link>
                    <Link to="/settings" onClick={handleOpenMenu} className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <VscSettings className='text-3xl base-icons'/>        
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