import { FindEmail, generateToken } from "@/services/auth.service.js";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        //Servicio de Busqueda de Email
        const result = await FindEmail(email);
        //Verificar Passwords
        if(password != result.password) return new Response(JSON.stringify({error:"Password Incorrecta"}),{status:401});
        //Servicio de Generacion de Token
        const token = generateToken(result);
        //Guardar el Token en Una Cookie
        (await cookies()).set("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        });
        //retornar Respuesta
        return new Response(JSON.stringify("Login Exitoso"), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}