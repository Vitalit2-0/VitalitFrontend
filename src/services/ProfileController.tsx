import axios from "axios";

export async function updateProfile(user: UserData, token: string): Promise<ResponseDto> 
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.patch('https://app-wlimmpn7xa-uc.a.run.app/v1/profile', user, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}