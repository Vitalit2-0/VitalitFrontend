import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { BiRun } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import NavigationManager from "../services/NavigationManager";
import useAuthStore from "../stores/AuthStore";
import NotificationCenter from "./NotificationCenter";

function Sidebar() {
    const auth = useAuthStore((state: any) => state);

    function handleLogout() {
        auth.logout();
        NavigationManager.navigateTo("/login");
    }

    return (
        <div className='fixed top-0 p-2 left-0 w-20 h-screen'>
            <div className='bg-white flex flex-col justify-between rounded-md w-full h-full shadow-light p-2'>
                <div>
                    <div className="flex w-full justify-center items-center h-16">
                        <picture><img src="assets/images/logo-short.png" className="p-2" alt="" /></picture>
                    </div>
                    <hr style={{border: "solid 1px #d1d5db"}}/>
                    <div>
                        <Link to="/dashboard" className="flex flex-col w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <HiOutlineHome className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/insights" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <MdOutlineInsertChartOutlined className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/workout" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <BiRun className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/mental-health" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <MdOutlineWbSunny className='text-3xl base-icons'/>
                        </Link>
                        <Link to="/nutrition" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                            <PiBowlFood className='text-3xl base-icons'/>
                        </Link>
                        <div className="w-full flex items-center justify-center h-12 base-gradient text-white rounded-lg font-bold text-2xl cursor-pointer">+</div>
                    </div>
                </div>
                <div>
                    <hr style={{border: "solid 1px #d1d5db"}}/>
                    <NotificationCenter/>
                    <Link to="/profile" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
                        <FaRegUser className='text-3xl base-icons'/>        
                    </Link>
                    <Link to="/settings" className="flex w-full justify-center items-center h-12 cursor-pointer mt-2 mb-1 rounded-md hover:bg-gray-300">
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