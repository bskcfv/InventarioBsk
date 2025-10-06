import { useRef } from "react";

export default function Productos(){
    
    const nombre = useRef();
    const precio = useRef();
    const decripcion = useRef();
    const stock = useRef();
    const image = useRef();

    const handleImage = async(e)=>{
        
    }

   const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const nombreV = nombre.current.value;
            const precioV = precio.current.value;
            const descripV = decripcion.current.value;
            const stockV = stock.current.value;
            const imageV = image.current.value;

            const result = await fetch("/api/Product", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({nombre:nombreV, precio:precioV, descrip:descripV, foto:imageV, stock:stockV})
            })
            const data = await result.json();
        } catch (error) {
            alert(error);
        }
    }

    return(
        <div>

        </div>
    )
}