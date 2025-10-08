import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/services/auth.service";

export default async function Layout({children}){
    //Children -> Rutas dentro del Directorio a las cuales se pueden acceder

    const token = cookies().get("access_token")?.value || null;

    let payload = null;
    try {
        payload = token ? await verifyToken(token) : null;
    } catch (error) {
        payload = null;
    }

    if(!payload) redirect("/login")

    return <div>{children}</div>

}