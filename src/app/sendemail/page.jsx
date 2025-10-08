"use client"
import { useRef } from "react"

export default function SendEmail(){
    //Recolector de Email
    const emailRef = useRef();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        //Obtencion de Valores
        const emailV = emailRef.current.value;
        //Validacion
        if(!emailV){
            alert("Digite su Email Porfavor")
            return;
        }
        try {
            //Peticion POST
            const result = await fetch("/api/Email",{
                method:"POST",
                headers:{"Content-Type":""},
                body:JSON.stringify({email: emailV})
            })
            //Esperar Resultado
            const data = await result.json()
            //Confirmar Envío
            if(data.info.accepted == emailV){
                alert("Link Enviado! Verifique su Email")
            }
        } catch (error) {
            alert("Email Desconocido")
        }
    }

    return(
        <div>
            <section className="m-4 p-4 flex justify-center">
                <form 
                onSubmit={handleSubmit}
                className="m-2 p-2 bg-gray-900 rounded-2xl"
                >
                    <h2 className="p-4 b-4 text-center">Escribe tu EMAIL</h2>
                    <div>
                        <label htmlFor="">Email: </label>
                        <input 
                        className="bg-gray-500 rounded-2xl m-2 p-2"
                        type="email"
                        ref={emailRef} />
                    </div>
                    <div className="flex justify-center">
                        <button 
                        type="submit"
                         className="m-4 p-4 cursor-pointer bg-gray-700 rounded-2xl hover:bg-gray-500 transition duration-300"
                        >Enviar Correo</button>
                    </div>
                </form>
            </section>
            <a href="/login"
            className="flex justify-center"
            >Sign In</a>
        </div>
    )
}