import axios from "axios";

export async function CreateNotification(token: string, notification: string) {
    const register: ActivityDto = {
        activity_type: "notification",
        activity_date: new Date().toLocaleDateString('en-GB'),
        activity_hour: new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),
        activity_detail: notification
    }

    RegisterActivity(token, register);
}

export async function RegisterActivity(token: string, activity: ActivityDto): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/v1/activity', activity, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function GetActivityHistory(token: string): Promise<ResponseDto>
{
    try {
        const types = ['sm', 'sf'];
        let history = [] as any;

        Array.from(types).forEach(async (type) => {
            const response = await GetHistory(token, type);
            if(response.data.data) {;
                history.push(...response.data.data);
            }
        });
        
        return { code: "200", string: "", data: history } as ResponseDto;
    } catch (error : any) {
        return { 
            code: "500",
            string: error,
            data: null 
        } as ResponseDto;
    }
}

export async function GetHistory(token: string, type: string): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/activity/${type}`, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}