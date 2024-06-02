import axios from "axios";

export async function registerUser(user : RegisterDto): Promise<ResponseDto> 
{  
    try {
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/register', user);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}
export async function loginUser(user : LoginDto): Promise<ResponseDto> 
{  
    try {
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/login', user);
        
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        console.log(error);
        return { 
            code: "500",
            string: "",
            data: null 
        } as ResponseDto;
    }
}

export async function validateUser(code : ValidateDto): Promise<ResponseDto>
{
    try {
        console.log(code);
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/validate', code );
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }

}

export async function notify2fa(username : string): Promise<ResponseDto>
{
    try {
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/notify/' + username);
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function activate2fa(username : { username: string }): Promise<ResponseDto>
{
    try {
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/qr', username);
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}
