"use client";
import { use, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProductById({ params }) {
    //params debe trabajarse con use()
    //recolectar el id de params
    const { id } = use(params);
    //UseRef que obtendrán valores
    const newPrecio = useRef();
    const newStock = useRef();
    //Router para navegacion de paginas
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //useRef Obtiene Datos en String
            //Objetiv -> Convertirlos a su tipo de dato Correspondiente
            const precioValue = parseFloat(newPrecio.current.value);
            const stockValue = parseInt(newStock.current.value);
            //Validacion de Campos
            if (!precioValue || !stockValue) {
                alert("Rellena los campos");
                return;
            }
            //Endpoint Update
            const result = await fetch(`/api/Product/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    precio: precioValue, 
                    stock: stockValue 
                }),
            });
            //Obtener Info del Resultado
            const data = await result.json();
            //Validar si hubo Actualizacion
            if (data) alert("ACTUALIZADO");
      
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };
    //Funcion para Eliminar Producto
    const deleteProduct = async () =>{
        try {
            const result = await fetch(`/api/Product/${id}`,{
                method:"DELETE",
                headers: { "Content-Type": "application/json" },
            })
            if(result) alert("Producto Eliminado")
            //Redireccion a Inventario
            router.push("/pdfschema")
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

  return (
    <div>
        <header className="flex justify-between">
            <p></p>
            <button 
            onClick={()=>deleteProduct()}
            className="m-4 p-2 w-3xs bg-red-500 rounded-2xl cursor-pointer"
            >Eliminar</button>
        </header>
        <section className="p-4 mt-4 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="m-4 p-4 flex flex-col gap-2 bg-gray-900 rounded-2xl">
                <h2 className="p-2 mb-2 text-center">Actualizar Producto ID: {id}</h2>
                <div className="flex space-x-9">
                    <label className="block mb-1">Precio: </label>
                    <input ref={newPrecio} type="number" step="any" className="border rounded p-1 w-full" />
                </div>
                <div className="flex space-x-10">
                    <label className="block mb-1">Stock: </label>
                    <input ref={newStock} type="number" className="border rounded p-1 w-full" />
                </div>
                <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-500 transition duration-300 text-white m-2 p-2 rounded-2xl">                
                Update
                </button>
            </form>
        </section>
        
    </div>
  );
}
