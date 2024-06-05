import {
    Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Restore from "./Restore";

function Redirect() {

    const [token, setToken] = useState("");
    const [queryParameters] = useSearchParams()

    useEffect(() => {
        let t = queryParameters.get("token");

        if(t)
        {
            setToken(t);
            const removeTokenFromUrl = () => {
                const urlWithoutToken = window.location.href.replace(/(\?|&)token=[^&]+/, '');
                window.history.replaceState({}, document.title, urlWithoutToken);
            };

            removeTokenFromUrl();
        } 
    }, []);

    if(token) {
        return <Restore token={token} />
    }

    return (
        <div className='w-full h-screen gap-5 flex base-gradient items-center justify-center flex-col'>
            <Image className="w-2/12" src="assets/images/logoVitalitBlanco.png" alt="Logo Vitalit"/>
            <h2 className='text-white font-bold'>Validando información, regálanos un momento...</h2>
        </div>
    )
}

export default Redirect