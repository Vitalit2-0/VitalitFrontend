import { IoMdNotificationsOutline } from "react-icons/io";
import Dot from "./stylers/Dot";

function NotificationCenter() {
    return (
        <div className="w-full flex justify-center pt-3 relative">
            <Dot className="animate-ping" width="8px" top="10px" right="8px" color="red" />
            <IoMdNotificationsOutline className="text-3xl base-icons hover:bg-gray-300 w-full h-12 p-1 rounded-md hover:cursor-pointer" />
        </div>
    )
}

export default NotificationCenter