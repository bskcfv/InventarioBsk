import ClientPromise from "@/lib/db";

//Servicio Busqueda de Email
export const FindEmail = async(email)=>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');
    //Query para Retornar Datos según Email
    const result = await db.collection('Auth').findOne({email});
    
    //Retornar Datos
    return {
        email: result.email,
        password: result.password
    }
}