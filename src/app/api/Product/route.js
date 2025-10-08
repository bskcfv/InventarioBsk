import { GetProductos, GetProductoByNombre, InsertProducto } from "@/services/product.service";
import { cookies } from "next/headers";
import { productSchema } from "@/validators/Schemas";

export async function GET(req) {
    try {
        //Llamado del Servicio de OBtenr Productos
        const result = await GetProductos();
        //Verificacion de Resultados
        if(!result) return new Response(JSON.stringify({message:"No Hay Productos Registrados"}),{status:401});
        //Retornar Productos
        return new Response(JSON.stringify({Productos:result}),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}

export async function POST(req) {
    try {
        //Obtencion de Token
        const token = cookies().get('access_token')?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        //Preparar Body
        const body = await req.json();
        //Asignar Valores al Body
        const {nombre, precio, descrip, foto, stock} = body;
        //Llamado de Validacion de los Valores Contenidos en el Body
        const parsed = productSchema.safeParse(body);
        //Verificar Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Llamado al servicio para verificacion De Productos Repetidos
        const ver = await GetProductoByNombre(nombre);
        //Verificacion
        if(ver) return new Response(JSON.stringify({message:"Producto Existente"}),{status:401});
        //llamado al Servicio Insert Productos
        const result = await InsertProducto(nombre, precio, descrip, foto, stock);
        //Retornar Resultado
        return new Response(JSON.stringify(result),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500});
    }
}