import {Gauge,Activity,TriangleAlert,TrafficCone,CloudRain,Sparkles} from 'lucide-react';import {Line} from 'react-chartjs-2';
import {Card,PageHead,Stat,Title,Badge} from '../components/ui';import {density,hours,lvl,incidents,suggestions} from '../data';
export default function Dashboard(){const h=new Date().getHours(),d=density[h];
return <><PageHead t="Command Dashboard" s="City-wide traffic status at a glance"/>
<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
<Stat icon={Gauge} label="Average speed" value={`${Math.round(52-d*.35)} km/h`}/><Stat delay={.05} icon={Activity} label={`Congestion now (${lvl(d)})`} value={`${d}%`}/>
<Stat delay={.1} icon={TriangleAlert} label="Active incidents" value={String(incidents.length)}/><Stat delay={.15} icon={TrafficCone} label="Signals optimized" value="87%"/></div>
<div className="grid lg:grid-cols-3 gap-4"><Card className="lg:col-span-2"><Title>Traffic density, last 24 hours</Title>
<Line data={{labels:hours,datasets:[{data:density,borderColor:'#22d3ee',backgroundColor:'rgba(34,211,238,.18)',fill:true,tension:.4,pointRadius:0}]}} options={{plugins:{legend:{display:false}},scales:{y:{max:100}}}}/></Card>
<Card delay={.1}><Title>Weather impact</Title><div className="flex items-center gap-3"><CloudRain size={40} className="text-cyan-400"/><div><div className="text-2xl font-bold">26°C, light rain</div><div className="text-sm text-slate-500">Visibility 6 km</div></div></div>
<p className="mt-3 text-sm">Expected effect: <b className="text-amber-500">+18% travel time</b> on arterial roads.</p></Card>
<Card delay={.15} className="lg:col-span-2"><Title><span className="flex items-center gap-2"><Sparkles size={16} className="text-cyan-400"/>AI suggestions to cut travel time</span></Title>
<ul className="space-y-2 text-sm">{suggestions.map(s=><li key={s} className="p-3 rounded-xl bg-cyan-500/10">{s}</li>)}</ul></Card>
<Card delay={.2}><Title>Recent incidents</Title><div className="space-y-3 text-sm">{incidents.map(i=><div key={i.id} className="flex justify-between gap-2"><span>{i.title}</span><Badge l={i.sev}/></div>)}</div></Card></div></>}
