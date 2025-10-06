import nodemailer from "nodemailer";

//Servicio de Creador de Transporte
export const transporterGmail = async() =>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GOOGLE_USER,
            pass:process.env.GOOGLE_PWD
        }
    })
    return transport;
}
//Servicio de Preparar Correo
export const mailprepare = async(recipient, tittle, body) =>{
    //Preparar Correo
    const mailOptions = {
        from:`"BskInventory <${process.env.GOOGLE_USER}>"`,
        to:recipient,
        subject:tittle,
        text:body
    }
    return mailOptions;
}
//Servicio de Enviar Correo
export const sendmail = async(transporter, mail) =>{
    return await transporter.sendMail(mail);
}