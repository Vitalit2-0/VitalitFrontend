import axios from "axios";

export async function SearchImages(query: string) {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${"PxJtJFST8skCXQNo2zhmGgmzfuHDjp7t1OYy4ucKWCI"}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}