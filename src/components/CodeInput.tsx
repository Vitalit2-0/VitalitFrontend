import { useRef, useEffect, useState } from 'react';
import { notify2fa, validateUser } from '../services/AuthStateProvider';
import { useModal } from './PopupAlert';
import NavigationManager from '../services/NavigationManager';
import useAuthStore from '../stores/AuthStore';

function CodeInput({ numberOfDigits, username, setOpen, isRegister, setValue2fa } : { numberOfDigits: number, username: string, setOpen: any, isRegister: boolean, setValue2fa?: any }) {
    const user: any = useAuthStore(state => state)
    const { showNotification } = useModal();
    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
    const otpBoxReference = useRef<any>([]);

    function handleChange(value: number, index: number) {
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if(value && index < numberOfDigits-1){
        otpBoxReference.current[index + 1].focus()
        }
    }

    function handleBackspaceAndEnter(e: any, index: number) {
        if(e.key === "Backspace" && !e.target.value && index > 0)
        {
            otpBoxReference.current[index - 1].focus()
        }
        if(e.key === "Enter" && e.target.value && index < numberOfDigits-1)
        {
            otpBoxReference.current[index + 1].focus()
        }
    }

    useEffect(() => { 
        if(otp.join("").length === 6) notifyOtp();
    }, [otp]);

    async function notifyOtp() {
        
        if(isRegister)
        {
            const response = await notify2fa(username);
            
            if(response.code !== "200")
            {
                showNotification("Ocurrió un error, por favor intenta de nuevo", "error");
                return;
            }
        }

        validateOtp();
    }

    async function validateOtp() {
        const response = await validateUser({ code: otp.join(""), login: username });

        if(response.code !== "200")
        {
            showNotification(response.string, "error");
            return;
        }

        showNotification("Código correcto, autenticación completa", "success");
        setOpen(false);
        
        if(!isRegister)
        {
            console.log(response);
            user.login({...response.data, ft_login: true})
            NavigationManager.navigateTo("/dashboard");
        }

        if(isRegister) setValue2fa(true);
    }

    return (
        <div className='flex items-center gap-2'>
        {otp.map((digit, index)=>(
            <input key={index} value={digit} maxLength={1}  
                onChange={(e:any)=> handleChange(e.target.value, index)}
                onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
                ref={(reference) => (otpBoxReference.current[index] = reference)}
                className={`border border-purple-500 w-12 h-auto text-center text-black p-3 rounded-md block base-white focus:border-2 focus:outline-none appearance-none`}
            />
        ))}
        </div>
    );
}

export default CodeInput;