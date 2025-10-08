import z from "zod";

export const productSchema = z.object({
    nombre: z.string(), 
    precio: z.number().positive(), 
    descrip: z.string(), 
    foto: z.string(), 
    stock: z.number().positive()
})

export const putProductSchema = z.object({
    precio: z.number().positive(),
    stock: z.number().positive()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Minimo el Uso de 6 Caracteres")
})