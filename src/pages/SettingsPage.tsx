import {Card,PageHead} from '../components/ui';import {Settings} from '../data';
export default function Config({s,set}:{s:Settings;set:(s:Settings)=>void}){
const T=(l:string,k:'dark'|'avoidToll'|'avoidTraffic')=><label className="flex justify-between items-center py-2"><span>{l}</span><input type="checkbox" className="scale-125" checked={s[k]} onChange={e=>set({...s,[k]:e.target.checked})}/></label>;
const N=(l:string,k:'fuelPrice'|'kmpl')=><label className="flex justify-between items-center py-2 gap-4"><span>{l}</span><input type="number" min={1} className="inp !w-28" value={s[k]} onChange={e=>set({...s,[k]:Math.max(1,+e.target.value)})}/></label>;
return <><PageHead t="Settings" s="Preferences are saved in this browser"/><Card className="max-w-xl divide-y divide-slate-500/20">
{T('Dark mode','dark')}{T('Avoid tolls by default','avoidToll')}{T('Avoid heavy traffic by default','avoidTraffic')}{N('Fuel price (₹ per litre)','fuelPrice')}{N('Vehicle mileage (km per litre)','kmpl')}
<div className="pt-3"><button className="btn2" onClick={()=>{localStorage.removeItem('aira-fav');location.reload()}}>Clear saved routes</button></div></Card></>}
