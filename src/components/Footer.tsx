import Menu from "./Menu"
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

function Footer({ setTransition } : { setTransition: any }) {
    return (
        <div className="rounded-t-3xl" style={{background: "#2d0653"}}>
            <div className="w-full flex justify-around p-10 flex-wrap content-center">
                <div className="flex flex-wrap content-center gap-1">
                    <a href="https://www.facebook.com/profile.php?id=61557425685573" target="_blank" rel="noopener noreferrer">
                        <FaFacebookSquare className="text-4xl color-white"/>
                    </a>
                    <a href="https://www.instagram.com/vitalit_co/" target="_blank" rel="noopener noreferrer">
                        <RiInstagramFill className="text-4xl color-white"/>
                    </a>
                    <a href="https://www.linkedin.com/in/vitalit-co/" target="_blank" rel="noopener noreferrer">
                        <IoLogoLinkedin className="text-4xl color-white"/>
                    </a>
                </div>
                <div>
                    <Menu setTransition={setTransition} color={"color-white"}/>
                </div>
                <div className="flex flex-wrap content-center gap-1">
                    <MdOutlineMail className="text-4xl color-white"/>
                    <a href="mailto:vvitalit.co@gmail.com" className="color-white mt-5">vvitalit.co@gmail.com</a>
                </div>
            </div>
        </div>
    )
}

export default Footer