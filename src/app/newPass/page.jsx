"use client"
import { useRef } from "react"

export default function NewPassword(){
    //Obtencion de Email Proveniente del Input
    const email = useRef();
    //Obtencion de Password Proveniente del Input
    const newPassword = useRef();
    //Funcion OnSubmit 
    // Objetivo -> Actualizar Password
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Obtener Valores
            const emailValue = email.current.value;
            const passValue = newPassword.current.value;
            //Peticion PUT
            const result = await fetch("/api/Auth/setPass", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: emailValue, newPassword: passValue})
            });
            const data = await result.json();
            alert(JSON.stringify(data));
        } catch (error) {
            alert(error)
        }
    }
    
    
    
    return(
        <section className="flex justify-center items-center h-screen">
            
            <form onSubmit={handleSubmit} className="flex flex-col p-10 m-2 bg-gray-700 rounded-full">
                <p className="p-2 m-2 text-center bg-gray-900 rounded-t-full">Recuperar Contrasenha</p>
                <div className="m-2 flex justify-between">
                    <label >Email: </label>
                    <input
                    className="bg-gray-900 rounded-2xl" 
                    type="text" 
                    ref={email}
                    />
                </div>
                <div className="m-2 flex justify-between">
                    <label>Nueva Contrasenha: </label>
                    <input
                    className="bg-gray-900 rounded-2xl"
                    type="text" 
                    ref={newPassword}
                    />
                </div>
                <div className="m-2 flex justify-center">
                    <button type="submit" className="p-4 cursor-pointer bg-gray-900 rounded-4xl hover:bg-gray-800 transition duration-300">Actualizar Contrasenha</button>
                </div>
                <a href="/login" className="p-2 m-2 flex justify-center bg-gray-900 rounded-b-full hover:bg-gray-800 transition duration-300">Sign In</a>
            </form>
        </section>
    )
}