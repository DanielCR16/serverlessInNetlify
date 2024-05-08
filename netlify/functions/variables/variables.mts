import { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;
    if(!myImportantVariable){
        throw 'variable no encontrada';
    }
    console.log("Hola Mundo desde los logs");
    return new Response(JSON.stringify({message: myImportantVariable}),{
        status:200,
        headers:{
            'Content-Type':'application/json'
        }
    })
}