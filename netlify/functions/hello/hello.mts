import type { Context, Handler, HandlerContext, HandlerEvent } from "@netlify/functions"

 export default async (req: Request, context: Context) => {
    console.log("Hola Mundo desde hello handler");
     return new Response(JSON.stringify({message: "HolaMundo"}),{
         status:200,
         headers:{
             'Content-Type':'application/json'
         }
     })
 }

//!ANTIGUA FORMA
//  const handler:Handler = async (event:HandlerEvent,context:HandlerContext)=>{
//      return {
//          statusCode:200,
//          body:JSON.stringify({
//              message:"Hola Mundoxasasxxxx",
//          }),
//          headers:{
//              'Content-Type':'application/json'
//          }
//      }
//      }
//      export {handler};