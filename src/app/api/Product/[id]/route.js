import { UpdateProducto, DeleteProduct } from "@/services/product.service";
import { cookies } from "next/headers";

export async function PUT(req, {params}) {
    try {
        //Obtener el Id de la url
        const {id} = params;
        //Obtencion de Token
        const token = cookies().get('access_token')?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        const {precio, stock} = await req.json(); 
        //Llamado al Servicio
        const result = await UpdateProducto(id, precio, stock);
        //Retornar Respuesta
        return new Response(JSON.stringify({Update:result}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error:error.message}),{status:500})
    }
}

export async function DELETE(req, {params}) {
    try {
        //Obtener el Id de la Url
        const {id} = params;
        //Obtencion de Token
        const token = cookies().get('access_token')?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        //Llamado del Servicio
        const result = await DeleteProduct(id);
        //Retornar Respuesta
        return new Response(JSON.stringify({Delete:result}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
    
}