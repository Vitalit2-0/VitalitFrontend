import axios from "axios";

export class AuthStateProvider
{
    public async registerUser(user : RegisterDto): Promise<User> 
    {  
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async loginUser(user : LoginDto): Promise<User> 
    {  
        try {
            const response = await axios.get('http://localhost:8080/login', {
                data: user
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}