import axios from "axios";

export async function getSurveyQuestions(token: string): Promise<ResponseDto> 
{   
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('https://app-wlimmpn7xa-uc.a.run.app/v1/survey', config);
        return { code: "200", string: "", data: response.data.data.survey_questions } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function sendSurveyAnswers(answers: SurveyDto, token: string): Promise<ResponseDto>
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/v1/survey', answers, config);
        return { code: "200", string: "", data: response.data } as ResponseDto;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function getSurveyResults(id: string, token: string)
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/survey/${id}`, config);
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}