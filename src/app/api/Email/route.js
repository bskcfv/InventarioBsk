import { transporterGmail, mailprepare, sendmail } from "@/services/email.service";
import { FindEmail } from "@/services/auth.service";

export async function POST(req) {
    try {
        //Titulo del Mail
        const tittle = "RECUPERACION DE CONTRASENHA"
        //Redireccion de pagina
        const redirect_page  = "http://localhost:3000/newPass";
        //Usuario al cual va dirigido el mail    
        const {User} =  await req.json();
        //Verificar Si existe el usuario en el Sistema
        try {
            //Llamado al Servicio de Encontrar Email
            await FindEmail(User);
        } catch (error) {
            return new Response(JSON.stringify({Message: "User No Encontrado en el Sistema"}), {status:401});
        }
        //Llamado al Servicio de Transporte 
        const transporter = await transporterGmail();
        //Llamado al Servicio de Preparar Correo
        const mail = await mailprepare(User, tittle, redirect_page);
        //Llamado al Servicio de Enviar Correo
        const result = await sendmail(transporter, mail);
        //Retornar Resultado
        return new Response(JSON.stringify({info: result}),{status:200}) 
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}