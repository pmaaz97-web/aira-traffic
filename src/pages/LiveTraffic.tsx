import {useEffect,useMemo,useState} from 'react';import MapView from '../components/MapView';import {Card,PageHead,Badge,Loader} from '../components/ui';import {C,lvl,segments,incidents} from '../data';
export default function Live(){const [v,setV]=useState(segments.map(s=>s.v)),[ready,setReady]=useState(false);
useEffect(()=>{const t=setTimeout(()=>setReady(true),700),i=setInterval(()=>setV(p=>p.map(x=>Math.max(5,Math.min(98,x+Math.round(Math.random()*14-7))))),4000);return()=>{clearTimeout(t);clearInterval(i)}},[]);
const lines=useMemo(()=>segments.map((s,i)=>({pts:s.p,color:C[lvl(v[i])],tip:`${s.name}: ${v[i]}% (${lvl(v[i])})`})),[v]);
const marks=useMemo(()=>incidents.map(i=>({pos:i.pos,color:'#a855f7',tip:`${i.type}: ${i.title}`})),[]);
return <><PageHead t="Live Traffic" s="Congestion updates every 4 seconds (simulated feed)"/>
<div className="grid lg:grid-cols-3 gap-4"><Card className="lg:col-span-2 !p-2">{ready?<MapView lines={lines} marks={marks} fit h="h-[480px]"/>:<div className="h-[480px] grid place-items-center"><Loader t="Connecting to traffic sensors…"/></div>}</Card>
<Card delay={.1}><h2 className="font-semibold mb-3">Corridors</h2><div className="space-y-4">{segments.map((s,i)=><div key={s.name}><div className="flex justify-between text-sm mb-1"><span>{s.name}</span><Badge l={lvl(v[i])}/></div>
<div className="h-2 rounded bg-slate-500/20 overflow-hidden"><div className="h-full transition-all duration-700" style={{width:`${v[i]}%`,background:C[lvl(v[i])]}}/></div></div>)}</div>
<p className="text-xs text-slate-500 mt-4">Purple markers show accidents, blocks and construction.</p></Card></div></>}
