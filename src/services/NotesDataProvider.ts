import axios from "axios";

export async function GetUserNotes(token:string, id:string)
{
    try
    {
        const config = 
        {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-wlimmpn7xa-uc.a.run.app/v1/notes/${id}`, config);
        return response.data;
    }
    catch(err){
        return err;
    }
}

export async function SetUserNotes(token:string, note: Note)
{
    try
    {
        const config = 
        {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post(`https://app-wlimmpn7xa-uc.a.run.app/v1/notes/`, note, config);

        return response.data;
    }
    catch(err){
        return err;
    }
}

export async function UpdateUserNotes(token:string, note: Note)
{
    try
    {
        const config = 
        {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.put(`https://app-wlimmpn7xa-uc.a.run.app/v1/notes/${note.note_id}`, note, config);

        return response.data;
    }
    catch(err){
        return err;
    }
}

export async function DeleteUserNotes(token:string, note_id: string)
{
    try
    {
        const config = 
        {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.delete(`https://app-wlimmpn7xa-uc.a.run.app/v1/notes/${note_id}`, config);

        return response.data;
    }
    catch(err){
        return err;
    }
}