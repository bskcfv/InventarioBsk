"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function PDF(){
    //Guarda los Productos, similar a los getters y setters
    const [productos, setProductos] = useState([]);
    const [stats, setStats] = useState([]);
    //Objetivo -> Redirigir Según Producto
    const router = useRouter();
    //Funcion OnCLick para Redirigir Página
    const  handleClick = (id) => {
        router.push(`/productos/${id}`)
    }
    //UseEffect llama la Api slo una vez, cuando los componentes estan montados
    //El [] al final, indica que solo se ejecute una vez la peticion una vez que se haya montado el componente
    useEffect(()=>{
        fetch("/api/Product")
        .then((res) => res.json())
        //La Api retorna: {Productos:[]}
        .then((data) => setProductos(data.Productos))
        .catch((err) => console.log("Error: ", err))
    }, []);

    useEffect(()=>{
        fetch("/api/Product/behavior")
        .then((res)=> res.json())
        //La Api retorna: [{}]
        .then((data)=>{setStats(data[0])})
        .catch((err)=>console.log("Error:", err))
    }, []);

    // Función para descargar PDF
    const downloadPDF = async () => {
        try {
        const res = await fetch("/api/PDF");
        //Convertir la respuesta a Binario (blob)
        const blob = await res.blob();
        //Crear una URL temporal que apunta al Blob
        //Para poder usarlo como enlace de descarga
        const url = window.URL.createObjectURL(blob);
        //crear una etiqueta de enlace <a>
        const a = document.createElement("a");
        //asignarle a la etiqueta la URL
        a.href = url;
        //Asignarle la funcion de descargar y no de abrir una pestanha
        //Asignar el nombre del archivo
        a.download = "inventario.pdf";
        //anhade la etiqueta al body para poder ser usada
        document.body.appendChild(a);
        //Simula el click de descarga
        a.click();
        //Elimina la etiqueta
        a.remove();
        //Elimina la url
        window.URL.revokeObjectURL(url);
        } catch (error) {
        console.error("Error al generar el PDF:", error);
        }
    };

    
    return(
        <div className="p-4">
            <div className="flex justify-between m-4 bg-gray-900 rounded-2xl">
                <a href="/productos" className='flex items-center  m-2 p-2 bg-gray-700 rounded-2xl hover:bg-gray-500 transition duration-300'>Registrar Nuevo Producto</a>
                <p className="p-4 m-2 text-center">INVENTARIO PRODUCTOS</p>
                <button 
                    className="cursor-pointer p-2 rounded" 
                    onClick={downloadPDF}
                >
                    <FontAwesomeIcon icon={faFilePdf} className="text-black text-5xl hover:text-gray-200 transition duration-300" />
                </button>
            </div>
            <section className="flex gap-4 justify-center">
                <div className=" p-4 bg-gray-950 rounded-2xl">
                    <p className="p-4 m-2 text-center">LISTADO</p>
                    {
                        productos.map((p)=>(
                            <div 
                            key={p._id}
                            //Sin Funcion Anonima -> Ejecutaría Inmediatamente la Funcion
                            //Con Funcion Anonima -> Espera a que el User haga Click
                            onClick={()=>{handleClick(p._id)}} 
                            className="flex flex-col md:flex-row items-center cursor-pointer p-4 m-2 bg-gray-900 rounded-lg gap-4 hover:bg-gray-700 transition duration-150">
                                <div className='m-2 '>
                                    {p.nombre} - ${p.precio} - Stock: {p.stock}
                                </div>
                                <div>
                                    {<img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nombre} className="w-15 h-15 object-contain rounded-2xl" />}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="p-4 m-2 bg-gray-900 rounded-2xl">
                    <p className="p-4 m-2">TOTAL DE STOCK</p>
                    <div className="p-4 m-2 bg-gray-900 rounded">
                        <p className="text-center">{stats.totalStock}</p>
                    </div>
                </div>
                <div className="p-4 m-2 bg-gray-950 rounded-2xl">
                    <p className="p-4 m-2">PROMEDIO DE STOCK Y PRECIO</p>
                    <div className="p-4 m-2 bg-gray-900 rounded">
                        <p className="text-center"> AVG STOCK: {stats.avgStock}</p>
                        <p className="text-center"> AVG PRECIO: {stats.avgPrecio}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}