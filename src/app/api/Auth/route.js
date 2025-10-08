import { FindEmail, generateToken } from "@/services/auth.service.js";
import { cookies } from "next/headers";
import { loginSchema } from "@/validators/Schemas";

export async function POST(req) {
    try {
        //Preparar Body
        const body = await req.json();
        //Asignar Valores a Body
        const {email, password} = body;
        //Llamado al Servicio de Validacion
        const parsed = loginSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
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