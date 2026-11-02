import {useEffect,useState} from 'react';import {Star,Navigation,Fuel,Clock,Ruler,Sparkles} from 'lucide-react';
import MapView,{Line} from '../components/MapView';import {Card,PageHead,Loader,Err,Badge} from '../components/ui';import {C,density,lvl,Settings,LL} from '../data';
type R={km:number;min:number;fuel:number;toll:number;lvl:ReturnType<typeof lvl>;score:number;pts:LL[]};
const geo=async(q:string):Promise<LL>=>{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`);const j=await r.json();if(!j[0])throw new Error(`Could not find "${q}". Try adding the city name.`);return[+j[0].lat,+j[0].lon]};
export default function Planner({s}:{s:Settings}){
const [a,setA]=useState('Majestic Bus Station, Bengaluru'),[b,setB]=useState('Electronic City, Bengaluru'),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[rs,setRs]=useState<R[]>([]);
const [fav,setFav]=useState<[string,string][]>(()=>{try{return JSON.parse(localStorage.getItem('aira-fav')||'[]')}catch{return[]}});
useEffect(()=>{localStorage.setItem('aira-fav',JSON.stringify(fav))},[fav]);
const [tl,setTl]=useState({toll:s.avoidToll,traf:s.avoidTraffic});
async function go(){setBusy(true);setErr('');setRs([]);try{
const [p,q]=await Promise.all([geo(a),geo(b)]);
const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${p[1]},${p[0]};${q[1]},${q[0]}?alternatives=true&overview=full&geometries=geojson`);
const j=await r.json();if(j.code!=='Ok')throw new Error('No drivable route found between these places.');
const d=density[new Date().getHours()];
const list:R[]=j.routes.map((x:any,i:number)=>{const km=x.distance/1000,dens=Math.min(98,d+(i?-12:8)),
min=x.duration/60*(1+dens/100*(tl.traf?.3:.5)),toll=!i&&km>25?85:0;
const score=Math.max(1,Math.round(100-min*.6-(tl.toll?toll:toll/4)-(tl.traf?dens*.2:dens*.1)));
return{km,min,toll,fuel:km/s.kmpl*s.fuelPrice,lvl:lvl(dens),score,pts:x.geometry.coordinates.map((c:number[])=>[c[1],c[0]])}});
setRs(list.sort((x,y)=>y.score-x.score))}catch(e:any){setErr(e.message||'Routing service unreachable. Check your connection and retry.')}setBusy(false)}
const lines:Line[]=[...rs].reverse().map((r,i,arr)=>({pts:r.pts,color:i===arr.length-1?'#22d3ee':'#64748b',w:i===arr.length-1?7:4,tip:`Score ${r.score}`}));
return <><PageHead t="Route Planner" s="Compare routes, scored by the AI engine for time, traffic, tolls and fuel"/>
<div className="grid lg:grid-cols-3 gap-4"><div className="space-y-4"><Card><div className="space-y-3">
<input className="inp" value={a} onChange={e=>setA(e.target.value)} aria-label="Source" placeholder="Source"/><input className="inp" value={b} onChange={e=>setB(e.target.value)} aria-label="Destination" placeholder="Destination"/>
<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tl.toll} onChange={e=>setTl({...tl,toll:e.target.checked})}/>Avoid tolls</label>
<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tl.traf} onChange={e=>setTl({...tl,traf:e.target.checked})}/>Avoid heavy traffic</label>
<button className="btn w-full flex justify-center items-center gap-2" disabled={busy} onClick={go}><Navigation size={16}/>Find best route</button>
{busy&&<Loader t="Analyzing routes…"/>}{err&&<Err m={err}/>}</div></Card>
<Card delay={.1}><h2 className="font-semibold mb-2 flex items-center gap-2"><Star size={16} className="text-amber-400"/>Favorite routes</h2>
{!fav.length&&<p className="text-sm text-slate-500">Plan a route, then save it with the star.</p>}
{fav.map(([x,y],i)=><div key={i} className="flex items-center justify-between text-sm py-1"><button className="text-left hover:text-cyan-400" onClick={()=>{setA(x);setB(y)}}>{x.split(',')[0]} → {y.split(',')[0]}</button><button onClick={()=>setFav(fav.filter((_,k)=>k!==i))} aria-label="Remove">✕</button></div>)}</Card></div>
<div className="lg:col-span-2 space-y-4"><Card className="!p-2"><MapView lines={lines} fit h="h-[360px]"/></Card>
{rs.map((r,i)=><Card key={i} delay={i*.08} className={i?'':'ring-2 ring-cyan-400/60'}>
<div className="flex flex-wrap justify-between gap-2 mb-2"><div className="font-semibold flex items-center gap-2">{i?`Alternative ${i}`:<><Sparkles size={16} className="text-cyan-400"/>AI recommended</>}<Badge l={r.lvl}/></div>
<div className="flex items-center gap-2"><span className="text-sm">AI score <b style={{color:C[r.score>65?'Low':r.score>40?'Medium':'High']}}>{r.score}</b></span>
{!i&&<button aria-label="Save favorite" onClick={()=>setFav([...fav,[a,b]])}><Star size={18} className="text-amber-400"/></button>}</div></div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"><span className="flex gap-2 items-center"><Clock size={14}/>{Math.round(r.min)} min</span><span className="flex gap-2 items-center"><Ruler size={14}/>{r.km.toFixed(1)} km</span>
<span className="flex gap-2 items-center"><Fuel size={14}/>₹{Math.round(r.fuel)} fuel</span><span>{r.toll?`₹${r.toll} toll`:'No toll'}</span></div></Card>)}</div></div></>}
