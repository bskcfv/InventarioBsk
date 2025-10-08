"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  //Getter y setter Productos  
  const [productos, setProductos] = useState([]);
  //Objetivo -> Redirigir Según Producto
  const router = useRouter();
  //Funcion OnCLick para Redirigir Página
  const  handleClick = (id) => {
    router.push(`/venta/${id}`)
  }

  useEffect(()=>{
    fetch("/api/Product")
    .then((res) => res.json())
    //La Api retorna: {Productos:[]}
    .then((data) => setProductos(data.Productos))
    .catch((err) => console.log("Error: ", err))
  }, []);


  return (
    <section>
      <div>
          <div className="bg-gray-600 flex justify-between">
            <a href="/login"
            className="m-4 p-2 text-black bg-gray-700 rounded-2xl hover:bg-gray-500 transition duration-300"
            >Iniciar Sesion</a>
            <a href="/pdfschema"
            className="m-4 p-2 text-black bg-gray-700 rounded-2xl hover:bg-gray-500 transition duration-300"
            >Inventario</a>
          </div>
          <div className=" p-4 bg-gray-950 rounded-2xl">
            <p className="p-4 m-2 text-center">PRODUCTOS EN VENTA</p>
            {
              productos ?
              productos.map((p)=>(
                  <div 
                    key={p._id}
                    //Sin Funcion Anonima -> Ejecutaría Inmediatamente la Funcion
                    //Con Funcion Anonima -> Espera a que el User haga Click
                    onClick={()=>{handleClick(p._id)}} 
                    className="flex flex-col md:flex-row items-center cursor-pointer p-4 m-2 bg-gray-900 rounded-lg gap-4 hover:bg-gray-700 transition duration-150"
                  >
                      <div className='m-2 '>
                        {p.nombre} - ${p.precio} - Unidades Disponibles: {p.stock}
                      </div>
                      <div>
                        {<img src={`data:image/jpeg;base64,${p.foto}`} alt={p.nombre} className="w-15 h-15 object-contain rounded-2xl" />}
                      </div>
                  </div>
                ))
                :
                <div>No hay productos</div>
            }
          </div>
      </div>
    </section>
  );
}
