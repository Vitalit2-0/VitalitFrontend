import axios from "axios";

export async function PublishPost(post: Post, user: User)
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        //localStorage.setItem("post", JSON.stringify(post));
        const response = await axios.post(`https://app-j462ku7pkq-uc.a.run.app/v1/blogs`, post, config);
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function GetPosts()
{
    try {

        const response = await axios.get(`https://app-j462ku7pkq-uc.a.run.app/blogs`);
        console.log(response);
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function GetPost(id: string)
{
    try {
        const response = await axios.get(`https://app-j462ku7pkq-uc.a.run.app/blogs/${id}`);
        console.log(response);
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function GetUserPosts(user: User)
{
    try {
        const response = await axios.get(`https://app-j462ku7pkq-uc.a.run.app/v1/blogs/user/${user.id}`);
        
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function UpdatePost(post: Post, user: User)
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        
        const response = await axios.put(`https://app-j462ku7pkq-uc.a.run.app/v1/blogs/${post.blog_id}`, post, config);
        
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}

export async function DeletePost(id: string, user: User)
{
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const response = await axios.delete(`https://app-j462ku7pkq-uc.a.run.app/v1/blogs/${id}`, config);
        
        return response.data;
    } catch (error : any) {
        return { 
            code: error.response.data.code, 
            string: error.response.data.string,
            data: null 
        } as ResponseDto;
    }
}