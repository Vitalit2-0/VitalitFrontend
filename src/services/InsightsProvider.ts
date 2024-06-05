import axios from "axios";

export const GetInsights = async (token: string, date:string, type:string) => {
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/activity/${getDateType(date)}/${date}?type=${type}`, config);
        return response.data;
    }
    catch(err){
        return err;
    }
}

const getDateType = (date: string): string => {
    if (date.includes('-')) {
        return 'month';
    } else {
        return 'year';
    }
};