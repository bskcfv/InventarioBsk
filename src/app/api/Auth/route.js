import { FindEmail } from "@/services/auth.service";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        //Servicio de Busqueda de Email
        const result = await FindEmail(email);
        //Verificar Passwords
        try {
            if(password == result.password) return new Response(JSON.stringify({user:result}), {status:200})  
        } catch (error) {
            return new Response(JSON.stringify({error:"Password Incorrecta"}),{status:401});
        }
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}