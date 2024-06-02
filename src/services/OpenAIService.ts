import axios from "axios";
import { AiRequests } from "./AIRequests";
import CryptoJS from 'crypto-js';

const decryptText = (encryptedText: string): string => {
    console.log("decrypting text");

    const bytes = CryptoJS.AES.decrypt(encryptedText, "nvouiwe8n3909mnlsmef893m-390234-dsa");
    console.log("d:",bytes.toString(CryptoJS.enc.Utf8));
    return bytes.toString(CryptoJS.enc.Utf8);
};

// const encryptText = (text: string): string => {
//     console.log(CryptoJS.AES.encrypt(text, "nvouiwe8n3909mnlsmef893m-390234-dsa").toString());
//     return CryptoJS.AES.encrypt(text, "nvouiwe8n3909mnlsmef893m-390234-dsa").toString();
// }

export async function Create(params: any, user: User) 
{
    let data = null;
    let counter = 0;

    while(!data && counter < 3)
    {
        counter++;
        let aiResponse = await RequestToAI(params, user);
        data = convertToJsonObject(aiResponse);
    }

    if(params.type === "guided_images")
    {
        const img = await RequestImageToAI(data.image_description);
        data.image = img;
    }
    console.log(data);
    return { code: "200", string: "", data: data } as ResponseDto;
}

async function RequestToAI(params: any, user: User)
{
    const request = new AiRequests();
    const prompt = await request.CreatePrompt(params, user);
    console.log(prompt);
    
    const ek = "U2FsdGVkX19hkx9apKmbXkv7kfWvLfiYRCI5V1JDIcVHwu0q9nW+JB3G/UQIGglQR+p7lIQ6EuLgxE4OpNkf+yJBNyQLQzpKv+8VC7cWZw4="
    const dk = decryptText(ek);
    console.log(dk);

    try{
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "user", content: prompt}
            ],
        };
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${dk}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        });
    
        let data = await response.json();
        console.log(data.choices[0].message.content);

        return data.choices[0].message.content;
    }
    catch(error: any)
    {
        return { 
            code: "500", 
            string: error, 
            data: null } as ResponseDto;
    }
}

export async function RequestImageToAI(prompt: string)
{
    try{
        const ek = "U2FsdGVkX19hkx9apKmbXkv7kfWvLfiYRCI5V1JDIcVHwu0q9nW+JB3G/UQIGglQR+p7lIQ6EuLgxE4OpNkf+yJBNyQLQzpKv+8VC7cWZw4="
        const dk = decryptText(ek);
        console.log(dk);

        const apiRequestBody = {
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        };
        
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${dk}`,
                "Content-Type": "application/json",
                "User-Agent": "Chrome"
            },
            body: JSON.stringify(apiRequestBody),
        });
    
        const data = await response.json();

        return data.data[0].url;
    }
    catch(error: any)
    {
        return { 
            code: "500", 
            string: error, 
            data: null } as ResponseDto;
    }
}

function convertToJsonObject(data: any) {
    try
    {
        return JSON.parse(data);
    }
    catch(error)
    {
        return null;
    }
}

export async function getExercisesForAI(token: string): Promise<ResponseDto>
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/exercises`, config);
        
        let exercises = response.data.data.map((e: any) => {
            return {
                exerciseName: e.exercise_name,
                exerciseId: e.exercise_id,
            }
        })

        return exercises;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function getExercises(token: string): Promise<ResponseDto>
{
    try {
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/exercises`, config);
        console.log(response.data.data);
        return response.data.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function getExerciseImage(exerciseId: string, token: string): Promise<string>
{
    try {
        const response: any = await getExercises(token);
        if(!response) return "";
        
        const exercise:any = Array.from(response).find((exercise: any) => exercise.exercise_id === exerciseId);
        console.log(exercise)
        return exercise.exercise_image;
    } catch (error : any) {
        return "";
    }
}