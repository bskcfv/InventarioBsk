import { UpdateProducto, DeleteProduct } from "@/services/product.service";
import { cookies } from "next/headers";
import { putProductSchema } from "@/validators/Schemas";

export async function PUT(req, {params}) {
    try {
        //Obtener el Id de la url
        const {id} = params;
        //Obtencion de Token
        const token = cookies().get('access_token')?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        //Preparar Body
        const body = await req.json();
        //Asignar Valores a Body
        const {precio, stock} = body;
        //LLamado a Validaciones
        const parsed = putProductSchema.safeParse(body)
        //Verificar Estado de los valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
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