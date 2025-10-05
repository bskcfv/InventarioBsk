import ClientPromise from "@/lib/db";

//Servicio de Estadisticas
export const Statsproducts = async() =>{
    const client = await ClientPromise;
    const db = client.db('BskInventory');

    const result = await db.collection('Producto').aggregate([
        {
            $group:{
                //Agrupa Todos Los Valores de la Coleccion
                _id:null,
                //Promedio de los Precios
                avgPrecio:{$avg:"$precio"},
                //Promedio del Stock
                avgStock:{$avg:"$stock"},
                //Suma Total del Stock
                totalStock:{$sum:"$stock"}
            }
        }
    //Convertirlo a Array para mayor Comodidad
    ]).toArray();
    
    return result;
}
