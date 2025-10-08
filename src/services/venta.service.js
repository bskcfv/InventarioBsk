import ClientPromise from "@/lib/db"
import { ObjectId } from "mongodb";

//Servicio de Insertar Venta
export const generateVenta = async(idproducto, cantidad, total, email) =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    const result = await db.collection('sale').insertOne({
        idproducto,
        cantidad,
        total,
        email
    })
    return result.insertedId;
}
//Servicio de Update Stock
export const updateStock = async(id, stock) =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    const result = await db.collection('Producto').updateOne(
        {_id:new ObjectId(id)},
        {$set:{stock}}
    )
}