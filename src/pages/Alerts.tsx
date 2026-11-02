import {useState} from 'react';import {Siren,Ambulance,Construction,OctagonX,ScanSearch} from 'lucide-react';import {Card,PageHead,Badge} from '../components/ui';import {incidents,Inc} from '../data';
const ic={Accident:Siren,Roadblock:OctagonX,Construction};
export default function Alerts(){const [list,setList]=useState<Inc[]>(incidents),[f,setF]=useState('All'),[msg,setMsg]=useState('');
const flash=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3500)};
const detect=()=>{const n:Inc={id:Date.now(),type:'Accident',title:'AI camera detected stalled vehicle, Hebbal flyover',pos:[13.0358,77.597],sev:'High',time:'just now'};setList([n,...list]);flash('Accident detected. Emergency services can now be notified.')};
const send=(id:number)=>{setList(list.map(i=>i.id===id?{...i,sent:true}:i));flash('Ambulance and traffic police dispatched.')};
return <><PageHead t="Emergency Alerts" s="Accidents, road blocks and construction"/>
{msg&&<div role="status" className="mb-4 p-3 rounded-xl bg-cyan-500/15 text-cyan-500 text-sm">{msg}</div>}
<div className="flex flex-wrap gap-2 mb-4">{['All','Accident','Roadblock','Construction'].map(k=><button key={k} onClick={()=>setF(k)} className={`btn2 ${f===k?'!bg-cyan-500/25 !border-cyan-400':''}`}>{k}</button>)}
<button className="btn ml-auto flex items-center gap-2" onClick={detect}><ScanSearch size={16}/>Run accident detection</button></div>
<div className="grid md:grid-cols-2 gap-4">{list.filter(i=>f==='All'||i.type===f).map((i,k)=>{const I=ic[i.type] as any||Construction;
return <Card key={i.id} delay={k*.05}><div className="flex gap-3"><div className="p-3 rounded-xl bg-red-500/15 text-red-500 h-fit"><I size={20}/></div>
<div className="flex-1"><div className="flex justify-between"><b>{i.type}</b><Badge l={i.sev}/></div><p className="text-sm my-1">{i.title}</p><p className="text-xs text-slate-500">{i.time}</p>
{i.type==='Accident'&&<button disabled={i.sent} onClick={()=>send(i.id)} className="btn mt-3 flex items-center gap-2"><Ambulance size={16}/>{i.sent?'Dispatched':'Dispatch emergency'}</button>}</div></div></Card>})}</div></>}
