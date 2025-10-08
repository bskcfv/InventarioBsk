import ClientPromise from "@/lib/db";
import JWT from "jsonwebtoken";

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

//Servicio de Creacion de Token
export const generateToken = (user) =>{
    return JWT.sign({
        email : user.email,
        password : user.password
    }, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRESS_IN})
}

//Servicio de Verificacion de Token
export const verifyToken = (token) =>{
    try {
        return JWT.verify(token, process.env.JWT_SECRET)
    } catch (error) { return null;}
}

//Servicio de Creacion de ResetToken
export const generateResetToken = (v_email) =>{
    return JWT.sign({
        email : v_email,
    }, 
    process.env.JWT_RESET_SECRET,
    {expiresIn: process.env.JWT_RESET_EXPIRESS_IN})
}

//Servicio de Verificacion de Token
export const verifyResetToken = (token) =>{
    try {
        return JWT.verify(token, process.env.JWT_RESET_SECRET)
    } catch (error) { return null;}
}