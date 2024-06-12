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
        console.log(error.response.data);
        return { 
            code: "409",
            string: error.response.data.string,
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

export async function SendRecoverMail(email:string)
{
    try {
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/password', {login: email});
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function RestorePass(token:string, psw:string)
{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/v1/password', {password: psw}, config);
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function RestoreSession(token:string)
{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get('https://app-wlimmpn7xa-uc.a.run.app/v1/ping', config);
        console.log(response);
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {

        console.log(error.response);
        return { 
            code: error.response.status, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function UpgradeUserPlan(user:User)
{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        console.log(user.token);
        const response = await axios.post(`https://app-wlimmpn7xa-uc.a.run.app/v1/premium/${user.id}`, null, config);
        console.log(response);
        return { code: "200", string: "", data: response.data.data } as ResponseDto;
    } catch (error : any) {

        console.log(error.response);
        return { 
            code: error.response.status, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function VerifySession(token: string): Promise<boolean> {
    console.log(token);
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(config);

        await axios.get('https://app-wlimmpn7xa-uc.a.run.app/v1/ping', config);
        return true;
    } catch (error: any) {
        console.log(error.response);
        return false;
    }
}
