"use client"
import { use, useRef } from "react"

export default function Sale({params}){
    //recolectar el id de params
    const { id } = use(params);
    //Objetivo -> Recolectar Datos de los Inputs
    const cantidadRef = useRef();
    //Funcion Enalzada al Formulario
    const handleSubmit = async(e) =>{
        //Inhabilitar Funciones que vienen por Default
        e.preventDefault();
        try {
            //Recoger Valores
            const cantidadV = cantidadRef.current.value;
            //Peticion POST
            const result = await fetch(`/api/sale/${id}`,{
                method:'POST',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    cantidad:cantidadV
                })
            })
            //Esperar Respuesta
            const data = await result.json();
            if(!data.ok){
                alert(JSON.stringify(data));
            }
            //Limpiar Campos
            cantidadRef.current.value = ""
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    return(
        <div>
            <section className="m-4 p-4 flex justify-center">
                <form onSubmit={handleSubmit} className="m-4 p-4 bg-gray-900 rounded-2xl">
                    <h2 className="mb-4 text-center">REGISTRAR COMPRA</h2>
                    <label className="m-4 text-center">Producto: {id}</label>
                    <div className="m-4 b-4">
                        <label>Cantidad: </label>
                        <input 
                        type="number"
                        ref={cantidadRef}
                        className="m-2 p-2 bg-gray-800 rounded-2xl"/>
                    </div>
                    <div className="m-4 b-4 flex justify-center">
                        <button 
                        type="submit"
                        className="m-4 p-4 bg-gray-800 rounded-2xl hover:bg-gray-400 transition duration-300 cursor-pointer"
                        >Comprar</button>
                    </div>
                </form>
            </section>
        </div>
    )
}