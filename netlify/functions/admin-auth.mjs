// Deploy to netlify/functions/admin-auth.mjs
export default async (request) => {
  if (request.method !== 'POST') return new Response(JSON.stringify({error:'Method not allowed'}), {status:405,headers:{'content-type':'application/json','cache-control':'no-store'}});
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return new Response(JSON.stringify({error:'Admin configuration missing'}), {status:503,headers:{'content-type':'application/json','cache-control':'no-store'}});
  let password;
  try { ({password} = await request.json()); } catch { return new Response(JSON.stringify({error:'Invalid request'}), {status:400,headers:{'content-type':'application/json','cache-control':'no-store'}}); }
  const encoder = new TextEncoder();
  const a = encoder.encode(typeof password === 'string' ? password : '');
  const b = encoder.encode(expected);
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length,b.length); i++) mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  const ok = mismatch === 0 && a.length > 0;
  return new Response(JSON.stringify(ok ? {ok:true} : {error:'Unauthorized'}), {status:ok?200:401,headers:{'content-type':'application/json','cache-control':'no-store'}});
};
export const config = {path:'/.netlify/functions/admin-auth'};
