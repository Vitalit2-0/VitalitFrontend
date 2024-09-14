import axios from "axios";
import { Create } from "./OpenAIService";

export async function PlanGoal(user: User, description: string) {
    
    const createGoal = {
        type: "goal",
        description: description
    }
    
    const response = await Create(createGoal, user);
    
    return response;
}

export async function RegisterGoal(token: string, goal: any): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://app-j462ku7pkq-uc.a.run.app/v1/goals', goal, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function UpdateGoal(token: string, goal: any, id:string, goal_id:string): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`https://app-j462ku7pkq-uc.a.run.app/v1/goals/${id}?goal.id=${goal_id}`, goal, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function GetUserGoal(token: string, id: string): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-j462ku7pkq-uc.a.run.app/v1/goals/${id}`, config);
        return { code: "200", string: "", data: response.data || [] } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function DeleteGoal(user: User, id: string): Promise<ResponseDto>
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.delete(`https://app-j462ku7pkq-uc.a.run.app/v1/goals/${user.id}?goal.id=${id}`, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}