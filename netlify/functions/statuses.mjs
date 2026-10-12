import { getStore } from '@netlify/blobs';
const headers={'content-type':'application/json','cache-control':'no-store'};
export default async (request) => {
 try {
  const store=getStore('acquisory-jobs');
  if(request.method==='GET') return new Response(JSON.stringify(await store.get('statuses',{type:'json'})||{}),{headers});
  if(request.method!=='POST') return new Response('Method not allowed',{status:405});
  const expected=process.env.ADMIN_PASSWORD;
  if(!expected) return new Response(JSON.stringify({error:'ADMIN_PASSWORD is not configured in Netlify environment variables.'}),{status:503,headers});
  if(request.headers.get('x-admin-password')!==expected) return new Response(JSON.stringify({error:'Incorrect admin password'}),{status:401,headers});
  const {id,status}=await request.json();
  if(typeof id!=='string'||!/^[a-z0-9-]{1,100}$/.test(id)||!['Open','Closed'].includes(status)) return new Response('Invalid status update',{status:400});
  const data=await store.get('statuses',{type:'json'})||{};
  data[id]=status;
  await store.setJSON('statuses',data);
  return new Response(JSON.stringify({ok:true,status}),{headers});
 }catch(err){return new Response(JSON.stringify({error:'Server storage unavailable. Check Netlify deployment and Blobs configuration.'}),{status:500,headers});}
};
