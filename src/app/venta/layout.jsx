import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/services/auth.service";

export default async function Layout({children}){
    //Children -> Rutas dentro del Directorio a las cuales se pueden acceder
    //Obtener el Token Contenido en la Cookie
    const token = cookies().get("access_token")?.value || null;
    //payload -> Informacion Relevante, Usualmente almacenada en algo más grande que la transporta
    //Inicializar Payload
    let payload = null;

    try {
        //Asignar a payload el Token Sí la Verificacion Fué Exitosa, o será null
        payload = token ? await verifyToken(token) : null;
    } catch (error) {
        //Asginar Null en caso de Error
        payload = null;
    }
    //Validacion de Acceso al Token
    if(!payload) redirect("/login")
    //Retornar a la page Correspondiente
    return <div>{children}</div>
}