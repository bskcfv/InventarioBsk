import { MongoClient } from "mongodb";

//Opciones de la Conexion
const options = {};
//Creación de la coneccion
const client = new MongoClient(process.env.MONGO_URI, options);
//Creacion de Clientes con capacidad de Promesas
const ClientPromise = client.connect();
//exportar ClientPromise
export default ClientPromise;