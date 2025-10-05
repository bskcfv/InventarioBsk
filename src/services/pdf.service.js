import puppeteer from "puppeteer";

export const GeneratePDF = async(html) =>{
    // launch -> Abre un navegador
    // headless : true -> Abre el navegador en segundo plano
    const browser = await puppeteer.launch({ headless: true });
    // newPage() -> Abre una nueva pestanha en el navegador
    const page = await browser.newPage();
    //setContent(html) -> carga el html definido en la pestanha
    //{waitunitl : "networkidle0"} ->  asegura que se carguen los estilos y scripts
    await page.setContent(html, { waitUntil: "networkidle0" });
    //.pdf() -> genera el pdf
    //format -> formato del pdf
    // printBackground: true -> a color
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    //.close() -> cerrar el navegador en donde ha sido abierto el html
    await browser.close();
    //retornar el pdf
    return pdf;
}