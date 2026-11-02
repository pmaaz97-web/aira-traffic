import {useState} from 'react';import {Bar} from 'react-chartjs-2';import {Brain,Zap} from 'lucide-react';
import {Card,PageHead,Title,Badge} from '../components/ui';import {C,density,hours,lvl,signals,suggestions,weatherSample} from '../data';
export default function Predict(){const [w,setW]=useState<keyof typeof weatherSample>('Rain'),[sig,setSig]=useState(signals.map(s=>s.green));
const h=new Date().getHours(),f=weatherSample[w].f,next=Array.from({length:12},(_,i)=>{const x=(h+i)%24;return{t:hours[x],v:Math.min(100,Math.round(density[x]*f))}});
const nowV=next[0].v;
return <><PageHead t="AI Prediction" s="Traffic density forecast and signal optimization"/>
<div className="grid lg:grid-cols-3 gap-4"><Card className="lg:col-span-2"><div className="flex flex-wrap justify-between items-center mb-3"><Title>Next 12 hours</Title>
<div className="flex gap-2">{(Object.keys(weatherSample) as (keyof typeof weatherSample)[]).map(k=><button key={k} onClick={()=>setW(k)} className={`btn2 ${w===k?'!bg-cyan-500/25 !border-cyan-400':''}`}>{k}</button>)}</div></div>
<Bar data={{labels:next.map(n=>n.t),datasets:[{data:next.map(n=>n.v),backgroundColor:next.map(n=>C[lvl(n.v)]),borderRadius:6}]}} options={{plugins:{legend:{display:false}},scales:{y:{max:100}}}}/></Card>
<Card delay={.1}><Title><span className="flex gap-2 items-center"><Brain size={16} className="text-cyan-400"/>Prediction now</span></Title><div className="text-5xl font-bold grad">{lvl(nowV)}</div>
<p className="text-sm mt-2 text-slate-500">Density {nowV}% with {w.toLowerCase()} weather. Weather effect on travel time: {weatherSample[w].i}.</p>
<ul className="mt-4 space-y-2 text-sm">{suggestions.slice(0,2).map(s=><li key={s} className="p-2 rounded-lg bg-cyan-500/10">{s}</li>)}</ul></Card>
<Card delay={.15} className="lg:col-span-3"><div className="flex justify-between items-center mb-3"><Title>Traffic signal optimization</Title>
<button className="btn flex gap-2 items-center" onClick={()=>setSig(signals.map(s=>s.sug))}><Zap size={16}/>Apply AI timings</button></div>
<div className="overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="py-2">Junction</th><th>Queue (veh)</th><th>Green time</th><th>AI suggestion</th><th>Status</th></tr></thead>
<tbody>{signals.map((s,i)=><tr key={s.id} className="border-t border-slate-500/20"><td className="py-2">{s.name}</td><td>{s.queue}</td><td className="font-semibold">{sig[i]}s</td><td>{s.sug}s</td><td><Badge l={sig[i]===s.sug?'Low':'Medium'}/></td></tr>)}</tbody></table></div></Card></div></>}
