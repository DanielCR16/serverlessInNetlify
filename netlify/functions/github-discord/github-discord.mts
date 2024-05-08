import type { Context, Handler, HandlerContext, HandlerEvent } from "@netlify/functions"

const notify = async (message:String)=>{
    
    const body = {
        content: message,
        embeds:[
            {image:{
                url:'https://c.tenor.com/2JcSqK13Y_kAAAAC/tenor.gif'
            }}
        ]
    }
    const resp = await fetch( process.env.DISCOR_WEBHOOK_URL?? "", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if ( !resp.ok ) {
        console.log('Error sending message to discord');
        return false;
      }
    return true;
}

const onStart=(payload:any):string=> {
    console.log("llega",payload)
    const {action,sender,repository,starred_at}=payload;
    return `User ${sender.login} ${action} star on ${repository.full_name}`;
}
const onIssues=(payload:any):string=>{
    const {action,issue,repository}=payload;
    if(action ==='opened'){
        const message =`An issue was opened with this tittle ${issue.title}`;
        return message;
    }
    if(action ==='closed'){
        const message =`An issue was closed by ${issue.user.login}`;
        return message;
    } 
        return `Unhandled action for the issue event ${action}`;
}

 export default async (req: Request, context: Context) => {
    const githubEvent = req.headers.get('x-github-event')?? 'unknown';
    let payload;
    let message:string;
     if (req.body) {
         const reader = req.body.getReader();
         const result = await reader.read();
         const decoder = new TextDecoder('utf-8');
         const text = decoder.decode(result.value);
         payload = JSON.parse(text);
     }
    switch(githubEvent){
        case 'star':
        message= onStart(payload);
        break;
        case 'issues':
            message= onIssues(payload);
        break;
        default:
            message=`Unknown event ${githubEvent}`;
    }

    await notify(message);
     return new Response(JSON.stringify({message: "Done"}),{
         status:200,
         headers:{
             'Content-Type':'application/json'
         }
     })
 }