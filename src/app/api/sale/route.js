import { generateVenta, updateStock } from "@/services/venta.service";
import { GetProductoById } from "@/services/product.service";
import { FindEmail } from "@/services/auth.service";

export async function POST(req) {
    try {
        //Valores a Necesitar
        const {email, id_producto, cantidad} = await req.json();
        //Validacion de Email
        try {
            //Llamado al Servicio de Encontrar Email
            await FindEmail(email);
        } catch (error) {
            return new Response(JSON.stringify({Message: "User No Encontrado en el Sistema"}), {status:401});
        }
        //Obtencion datos del Producto
        const result = await GetProductoById(id_producto);
        //Validar Existencia del Producto
        if(!result) return new Response(JSON.stringify("Producto No Registrado"), {status:401})
        //Validar Stock Antes de Venta
        if(cantidad > result.stock) return new Response(JSON.stringify("Stock Insuficiente"),{status:401})
        //Calcular Precio Segun Producto y Cantidad
        const total = result.precio * cantidad;
        //Calcular Nuevo Stock
        const newStock = result.stock - cantidad;
        //Servicio de Update Stock
        await updateStock(id_producto, newStock);
        //Servicio de Generar Venta
        const sale = await generateVenta(id_producto, cantidad, total, email);
        //Retornar Respuesta
        return new Response(JSON.stringify({sale}),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}