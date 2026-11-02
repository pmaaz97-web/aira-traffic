import {useEffect,useState} from 'react';import {AnimatePresence,motion} from 'framer-motion';
import {LayoutDashboard,Map as MapIcon,Route as RouteIcon,Brain,BarChart3,Siren,Settings as Cog,Sun,Moon,Menu,X,Radar} from 'lucide-react';
import {Settings} from './data';import Dashboard from './pages/Dashboard';import Live from './pages/LiveTraffic';import Planner from './pages/RoutePlanner';
import Predict from './pages/Prediction';import Analytics from './pages/Analytics';import Alerts from './pages/Alerts';import Config from './pages/SettingsPage';
const nav:[string,string,any][]=[['dashboard','Dashboard',LayoutDashboard],['live','Live Traffic',MapIcon],['planner','Route Planner',RouteIcon],['predict','AI Prediction',Brain],['analytics','Analytics',BarChart3],['alerts','Emergency Alerts',Siren],['settings','Settings',Cog]];
const def:Settings={dark:true,fuelPrice:102,kmpl:15,avoidToll:false,avoidTraffic:true};
export default function App(){
const [page,setPage]=useState(location.hash.slice(1)||'dashboard'),[open,setOpen]=useState(false);
const [s,setS]=useState<Settings>(()=>{try{return{...def,...JSON.parse(localStorage.getItem('aira-settings')||'{}')}}catch{return def}});
useEffect(()=>{document.documentElement.classList.toggle('dark',s.dark);localStorage.setItem('aira-settings',JSON.stringify(s))},[s]);
const go=(p:string)=>{setPage(p);location.hash=p;setOpen(false)};
const view=()=>{switch(page){case 'live':return <Live/>;case 'planner':return <Planner s={s}/>;case 'predict':return <Predict/>;case 'analytics':return <Analytics/>;case 'alerts':return <Alerts/>;case 'settings':return <Config s={s} set={setS}/>;default:return <Dashboard/>}};
return <div className="min-h-screen lg:pl-64">
<aside className={`fixed inset-y-0 left-0 w-64 z-40 glass !rounded-none p-4 transition-transform ${open?'':'-translate-x-full'} lg:translate-x-0`}>
<div className="flex items-center gap-2 mb-8"><div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white"><Radar/></div>
<div><div className="text-xl font-bold grad">AIRA</div><div className="text-[10px] leading-tight text-slate-500 dark:text-slate-400">Smart Traffic Management</div></div></div>
<nav className="space-y-1">{nav.map(([id,l,I])=><button key={id} onClick={()=>go(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${page===id?'bg-gradient-to-r from-cyan-500/25 to-blue-600/25 text-cyan-500 font-semibold':'hover:bg-slate-500/10'}`}><I size={18}/>{l}</button>)}</nav>
<div className="absolute bottom-4 left-4 right-4 text-xs text-slate-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>System online</div></aside>
<header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 glass !rounded-none !border-x-0 !border-t-0">
<button className="lg:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
<div className="hidden lg:block text-sm text-slate-500 dark:text-slate-400">AIRA: Artificial Intelligence for Responsive Assistance</div>
<button className="btn2 flex items-center gap-2" onClick={()=>setS({...s,dark:!s.dark})}>{s.dark?<Sun size={16}/>:<Moon size={16}/>}{s.dark?'Light':'Dark'}</button></header>
<main className="p-4 md:p-8 max-w-7xl mx-auto"><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0}} transition={{duration:.2}}>{view()}</motion.div></AnimatePresence></main></div>}
