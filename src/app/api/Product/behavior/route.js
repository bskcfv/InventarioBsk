import { Statsproducts } from "@/services/behavior.service";

export async function GET(req) {
    try {
        //Llamado al servicio de Estadisticas de Los Productos
        const result = await Statsproducts();
        //Verificacion si llega a estar vacio
        if(!result) return new Response(JSON.stringify({message:"No hay Estadisticas"}), {status:401})
        //Retornar Datos
        return new Response(JSON.stringify(result),{status:200});        
    } catch (error) {
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}