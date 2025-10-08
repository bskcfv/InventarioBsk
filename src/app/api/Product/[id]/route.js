import { UpdateProducto, DeleteProduct } from "@/services/product.service";

export async function PUT(req, {params}) {
    try {
        //Obtener el Id de la url
        const {id} = params;
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
        //Llamado del Servicio
        const result = await DeleteProduct(id);
        //Retornar Respuesta
        return new Response(JSON.stringify({Delete:result}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
    
}