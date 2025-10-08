"use client"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Productos(){
    
    //UseRef -> Hook para Obtener los Datos de Inputs
    const nombre = useRef();
    const precio = useRef();
    const decripcion = useRef();
    const stock = useRef();
    //Objetivo -> Redireccionar a Inventario
    const router = useRouter();
    //UseState -> Getters y Setters
    //preview -> Mostrar Previsualizacion de Imagen Cargada
    const [preview, setPreview] = useState(null);
    //bas64Image -> Almacenar datos en bas64 de la Imagen Cargada
    const [base64Image, setBase64Image] = useState("");

    //Funcion al Cargar Imagen
    // e -> event
    const handleImageChange = (e) => {
        // target -> es el elemento enviado
        // files -> FileList -> Tomar el primer archivo con [0]
        const file = e.target.files[0];
        //Validacion, si el archivo ha sido enviado.
        if (!file) return;
        // Instanciar clase FileReader
        const reader = new FileReader();
        //onloadend -> Evento 'Al estar cargada la Imagen'
        //funcion flecha, en nuestro caso, es un callback
        //callback -> Funcion que se llama despues de la funcion: readAsDataURL
        reader.onloadend = () => {
            //Resultado: data:image/png;base64,xxxxxxxx
            const base64 = reader.result;
            //separar con split(",") -> data:image/png;base64,xxxxxxxx en una lista para obetener solo el xxxx
            //[data:image/png;base64 , xxxxxxxx] -> [1] -> xxxxx
            const realbase64 = base64.split(",")[1]
            //Mostrar una vista previa
            setPreview(base64);
            //Guardar el string realbase64           
            setBase64Image(realbase64);       
        };
    
        //readAsDataURL -> Funcion de Lectura de Archivos y Convertor a base64
        //Despues de ejecutar la funcion, se llamará al callback
        reader.readAsDataURL(file);
    };
    //Funcion al Subir Formulario
    const handleSubmit = async(e) =>{
        //Evitar la Accion Default de una Etiqueta
        e.preventDefault();
        try {
            //Obtener Valores de las variables (userRef)
            const nombreV = nombre.current.value;
            const precioV = precio.current.value;
            const descripV = decripcion.current.value;
            const stockV = stock.current.value;
            //Validacion de la Entrada de Datos
            if (!nombreV || !precioV || !descripV || !stockV || !base64Image) {
                alert("Faltan datos o la imagen");
                return;
            }
            //Llamado al EndPoint de Product
            await fetch("/api/Product", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre:nombreV, 
                    //Conversion a Float
                    precio:parseFloat(precioV), 
                    descrip:descripV, 
                    foto:base64Image, 
                    //Conversion a Entero
                    stock:parseInt(stockV)
                })
            })
            //Avisar Registro Exitoso
            alert("Producto Registrado")
            router.push("/pdfschema")
        } catch (error) {
            //Avisar Error
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center m-4 p-2">
            <form onSubmit={handleSubmit} className="m-2 p-2 bg-gray-900 rounded-2xl ">
                <p className="text-center">REGISTRO PRODUCTO</p>
                <div className="flex justify-between items-center">
                    <label htmlFor="">Nombre: </label>
                    <input className="bg-gray-500 rounded-2xl m-2 p-2"
                    type="text"
                    ref={nombre} />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="">Descripcion: </label>
                    <input className="bg-gray-500 rounded-2xl m-2 p-2"
                    type="text"
                    ref={decripcion} />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="">Precio: </label>
                    <input className="bg-gray-500 rounded-2xl m-2 p-2"
                    type="number"
                    step='any'
                    ref={precio} />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="">Stock: </label>
                    <input className="bg-gray-500 rounded-2xl m-2 p-2"
                    type="number"
                    ref={stock} />
                </div>
                <div className="flex justify-between">
                    <input
                    className="m-2 p-2 bg-gray-500 rounded-2xl"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                </div>
                <div  className="flex justify-center">
                    <button type="submit" className="m-4 p-4 cursor-pointer bg-gray-700 rounded-2xl hover:bg-gray-500 transition duration-300">Subir imagen</button>
                </div>
            </form>

        {preview && (
            <div className="m-2 bg-gray-900 rounded-2xl">
            <img src={preview} alt="Vista previa" className="m-2 p-2 w-80 rounded-2xl" />
            <p className="p-4 text-center text-amber-50">Imagen lista para enviar</p>
            </div>
        )}
        </div>
    );
}