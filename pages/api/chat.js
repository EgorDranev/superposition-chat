export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).end();
  try{
    const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","x-api-key":process.env.ANTHROPIC_API_KEY},body:JSON.stringify(req.body)});
    res.status(r.status).json(await r.json());
  }catch(e){res.status(500).json({error:e.message});}
}
