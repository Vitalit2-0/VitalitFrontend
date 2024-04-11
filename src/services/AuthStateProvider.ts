import axios from "axios";
export class AuthStateProvider
{
    public async registerUser(user : RegisterDto): Promise<ResponseDto> 
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

    public async loginUser(user : LoginDto): Promise<ResponseDto> 
    {  
        try {
            const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/login', user);
            
            return { code: "200", string: "", data: response.data } as ResponseDto;
        } catch (error : any) {
            return { 
                code: error.response.data.code, 
                string: error.response.data.string,
                data: null 
            } as ResponseDto;
        }
    }
}