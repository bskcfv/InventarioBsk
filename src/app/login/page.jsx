"use client"
import { useRouter } from "next/navigation";
import { useRef } from "react"


export default function LogIng(){
    //Recolectores de Data
    const emailRef = useRef();
    const passRef = useRef();
    //Redireccionador de Paginas
    const route = useRouter();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        //Recibir Valores
        const emailV = emailRef.current.value;
        const passV = passRef.current.value;
        //Validacion
         if (!emailV || !passV) {
            alert("Por favor completa todos los campos.");
            return;
        }
        //Peticion POST
        try {
            const result = await fetch("/api/Auth",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({email: emailV, password: passV})
            })
            //Esperar Resultado
            await result.json()
            //Redirigir a Inventario Sí todo Fué Exitoso
            route.push("/pdfschema")
        } catch (error) {
            alert("Credenciales Incorrectas");
            return;
        }
    }

    return(
        <div>
            <section className="m-4 p-4 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="m-4 p-4 bg-gray-900 rounded-2xl">
                    <h2 className="mb-4 text-center">SIGN IN</h2>
                    <div className="">
                        <label htmlFor="">Email: </label>
                        <input 
                        type="email"
                        ref={emailRef}
                        className="m-2 p-2 bg-gray-800 rounded-2xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Password: </label>
                        <input 
                        type="password"
                        ref={passRef} 
                        className="m-2 p-2 bg-gray-800 rounded-2xl"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                        type="submit"
                        className="m-4 p-4 bg-gray-800 rounded-2xl hover:bg-gray-400 transition duration-300 cursor-pointer"
                        >Sign In</button>
                    </div>
                </form>
                <div>
                    <a href="/sendemail">Olvidaste tu Contraseña?</a>
                </div>
            </section>
        </div>
    )
}