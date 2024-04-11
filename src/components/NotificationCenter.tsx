import { IoMdNotificationsOutline } from "react-icons/io";
import Dot from "./stylers/Dot";

function NotificationCenter() {
    return (
        <div className="absolute top-5 right-5 p-2">
            <Dot className="animate-ping" width="8px" top="10px" color="red" />
            <IoMdNotificationsOutline className="text-3xl base-icons" />
        </div>
    )
}

export default NotificationCenter