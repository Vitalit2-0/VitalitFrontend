import axios from "axios";

export async function createPreference(token:string, product: {title: string, unit_price: number, quantity: number}){
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/v1/payment', product, config);
;
        const id = response.data.data;
        return id;
    }
    catch(e) {
        console.log(e);
    }
}