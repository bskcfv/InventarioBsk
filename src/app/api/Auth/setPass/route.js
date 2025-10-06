import { UpdatePass, FindEmail } from "@/services/auth.service";

export async function PUT(req) {
    try {
        //Email y Nueva Contrasenha
        const {email, newPassword} = await req.json();
        try {
            //Llamado al Servicio de Ecnontrar Email
            await FindEmail(email);  
        } catch (error) {
            return new Response(JSON.stringify({message: "User No encontrado"}), {status:401});
        }
        //Llamado al Servicio de Update Password
        const result = await UpdatePass(email, newPassword);
        //verificacion (el servicio retorna 0 si no se pudo actualizar la password)
        if(result == 0) return new Response(JSON.stringify({message:"Use una Nueva Contrasenha"}), {status:401})
        //Retornar Respuesta
        return new Response(JSON.stringify({update: "Contrasenha Actualizada"}), {status:200})        
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}