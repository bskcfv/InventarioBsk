import { GeneratePDF } from "@/services/pdf.service";
import { Statsproducts } from "@/services/behavior.service";
import { GetProductos } from "@/services/product.service";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        //Obtencion de Token
        const token = cookies().get('access_token')?.value;
        //Validar Existencia del Token
        if(!token) return new Response(JSON.stringify({message:"User No Autorizado"}),{status:401});
        //Servicio de Obtener todos los Productos
        const lsProducts = await GetProductos();
        //Servicio de Obtener Estadisticas
        const StatsProducts = await Statsproducts();
        //Obtener la posicion dentro del array, en donde se encuentran los valores
        const Stats = StatsProducts[0];
        //Mapear lsPorducts y agregarlos a una etiqueta HTML
        const ProductsHTML = lsProducts.map((p)=>
        //Solo se puede usar html Puro
        //base64 para recibir imagenes en formato binario
        `<div class="card">
            <div class="info">
                ${p.nombre} - $${p.precio} - Stock: ${p.stock}
            </div>
            ${p.foto ? `<img src="data:image/png;base64,${p.foto}" alt="${p.nombre}" class="product-img">` : ''}
        </div>`
        //join("") convierte un array en un solo string
        ).join("");
        //HTML a cargar
        //Solo se puede usar HTML PURO
            const html = `
                <html>
                <head>
                <style>
                    /* Reset y body */
                    body { 
                    font-family: sans-serif; 
                    background-color: #1f2937; /* bg-gray-800 */
                    color: white; 
                    margin: 0; 
                    padding: 0; 
                    }

                    /* Contenedor principal */
                    .container {
                    padding: 16px;
                    }

                    /* Header */
                    .header {
                    background-color: #1e40af; /* bg-blue-950 */
                    text-align: center;
                    padding: 20px;
                    margin: 16px 0;
                    border-radius: 16px; /* rounded-2xl */
                    font-size: 24px;
                    font-weight: bold;
                    }

                    /* Sección con flex */
                    .section {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    }

                    /* Caja para listado y stats */
                    .box {
                    background-color: #1e3a8a; /* bg-blue-950 para stats */
                    padding: 16px;
                    border-radius: 16px; /* rounded-2xl */
                    min-width: 220px;
                    flex: 1;
                    }

                    /* Caja interna con fondo oscuro */
                    .inner-box {
                    background-color: #111827; /* bg-gray-900 */
                    padding: 12px;
                    border-radius: 12px;
                    text-align: center;
                    margin-top: 8px;
                    }
                    .card {
                        background-color: #111827;
                        margin: 8px 0;
                        padding: 12px;
                        border-radius: 12px;
                        display: flex; /* fila */
                        align-items: center; /* centra verticalmente */
                        gap: 12px; /* espacio entre texto e imagen */
                    }

                     .info {
                            flex: 1; /* ocupa el espacio restante */
                        }

                      .product-img {
                        width: 40px; /* tamaño de la imagen */
                        height: 40px;
                        border-radius: 8px;
                        object-fit: contain; /* mantiene proporción */
                    }

                    /* Texto centrado para títulos */
                    .text-center {
                    text-align: center;
                    }
                    p { margin: 4px 0; }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">INVENTARIO PRODUCTOS</div>

                    <section class="section">
                    <!-- Listado de productos -->
                    <div class="box">
                        <p class="text-center">LISTADO</p>
                        ${ProductsHTML}
                    </div>

                    <!-- Total de stock -->
                    <div class="box">
                        <p class="text-center">TOTAL DE STOCK</p>
                        <div class="inner-box">${Stats.totalStock}</div>
                    </div>

                    <!-- Promedios -->
                    <div class="box">
                        <p class="text-center">PROMEDIO DE STOCK Y PRECIO</p>
                        <div class="inner-box">
                        <p>AVG STOCK: ${Stats.avgStock}</p>
                        <p>AVG PRECIO: ${Stats.avgPrecio}</p>
                        </div>
                    </div>
                    </section>
                </div>
                </body>
                </html>
            `;

        //Llamado del Servicio Generador de PDF
        const pdf = await GeneratePDF(html);
        //Retornar Respuesta
        return new Response(pdf, {
            status:200,
            headers:{
                //Informar al Navegador que la respuesta es un pdf
                "Content-Type": "application/pdf",
                //Descargar con el nombre inventario.pdf
                "Content-Disposition": "attachment; filename=inventario.pdf"
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}
  