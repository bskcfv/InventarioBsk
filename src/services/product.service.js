import ClientPromise from "@/lib/db"; 
import { ObjectId } from "mongodb";

//Servicio GET Productos
export const GetProductos = async() =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    //Query para Consultar Documentos de la Coleccion Productos
    const result = await db.collection('Producto').find().toArray();
    //Verificacion de resultados
    if(!result) throw new Error("Registros Vacios");
    //Retornar Datos
    return result;
}

//Servicio GET Producto segun Nombre
export const GetProductoByNombre = async(nombre)=>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    //Query de Busqueda por Nombre
    const result = await db.collection('Producto').findOne({nombre});

    return result;
}

//Servicio GET Producto segun Id
export const GetProductoById = async(id)=>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    //Query de Busqueda por ID
    const result = await db.collection('Producto').findOne({_id: new ObjectId(id)});

    return result;
}

//Servicio Insert Productos
export const InsertProducto = async(nombre, precio, descrip, foto, stock) =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    //Query de Insertar Productos
    const result = await db.collection('Producto').insertOne({
        nombre,
        precio,
        descrip,
        foto,
        stock
    });

    return result.insertedId;
}

//Servicio Delete Producto
export const DeleteProduct = async(id) => {
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    const result = await db.collection('Producto').deleteOne(
        {_id: new ObjectId(id)}
    );

    return result.deletedCount;
}

//Servicio Update Producto
export const UpdateProducto = async(id, precio, stock) => {
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    const result = await db.collection('Producto').updateOne(
        {_id:new ObjectId(id)}, 
        {$set: { precio, stock }}
    );

    return result.modifiedCount;
}   