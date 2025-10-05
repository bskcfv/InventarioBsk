import { GetProductos, GetProductoByNombre, InsertProducto } from "@/services/product.service";

export async function GET(req) {
    try {
        //Llamado del Servicio de OBtenr Productos
        const result = await GetProductos();
        //Verificacion de Resultados
        if(!result) return new Response(JSON.stringify({message:"No Hay Productos Registrados"}));
        //Retornar Productos
        return new Response(JSON.stringify({Productos:result}),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}

export async function POST(req) {
    try {
        const {nombre, precio, descrip, foto, stock} = await req.json();
        //Llamado al servicio para verificacion De Productos Repetidos
        const ver = await GetProductoByNombre(nombre);
        //Verificacion
        if(ver) return new Response(JSON.stringify({message:"Producto Existente"}));
        //llamado al Servicio Insert Productos
        const result = await InsertProducto(nombre, precio, descrip, foto, stock);
        //Retornar Resultado
        return new Response(JSON.stringify({message:result}),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500});
    }
}