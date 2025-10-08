import { generateVenta, updateStock } from "@/services/venta.service";
import { GetProductoById } from "@/services/product.service";
import { FindEmail, verifyToken } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req, {params}) {
    try {
        //Obtener ID del producto por medio de la URL
        const {id} = params;
        //Valores a Necesitar de Body
        const {cantidad} = await req.json();
        //Obtener Token de la Cookie
        const token = cookies().get("access_token")?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        //Verificar Autenticidad del Token Y Obtencion de Datos
        const decoded = verifyToken(token);
        if(!decoded) return new Response(JSON.stringify({message:"Token Invalido o Expirado"}),{status:401});
        //Validacion de Email
        try {
            //Llamado al Servicio de Encontrar Email
            await FindEmail(decoded.email);
        } catch (error) {
            return new Response(JSON.stringify({Message: "User No Encontrado en el Sistema"}), {status:401});
        }
        //Obtencion datos del Producto
        const result = await GetProductoById(id);
        //Validar Existencia del Producto
        if(!result) return new Response(JSON.stringify("Producto No Registrado"), {status:401})
        //Validar Stock Antes de Venta
        if(cantidad > result.stock) return new Response(JSON.stringify("Stock Insuficiente"),{status:401})
        //Calcular Precio Segun Producto y Cantidad
        const total = result.precio * cantidad;
        //Calcular Nuevo Stock
        const newStock = result.stock - cantidad;
        //Servicio de Update Stock
        await updateStock(id, newStock);
        //Servicio de Generar Venta
        const sale = await generateVenta(id, cantidad, total, decoded.email);
        //Retornar Respuesta
        return new Response(JSON.stringify({sale}),{status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}