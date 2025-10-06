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

//Servicio de Update Password
export const UpdatePass = async(email, password) =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');
    //Query para Actualizar password segun id
    const result = await db.collection('Auth').updateOne(
        {email}, 
        {$set:{password}}
    )
    //Retornar Resultado
    return result.modifiedCount;
}