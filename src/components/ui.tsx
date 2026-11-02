import {motion} from 'framer-motion';import {Loader2} from 'lucide-react';import {ReactNode} from 'react';import {C,Level} from '../data';
export const Card=({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number})=>
<motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay,duration:.35}} className={`glass p-5 ${className}`}>{children}</motion.div>;
export const Title=({children}:{children:ReactNode})=><h2 className="font-semibold mb-3">{children}</h2>;
export const PageHead=({t,s}:{t:string;s:string})=><div className="mb-6"><h1 className="text-2xl md:text-3xl font-bold grad">{t}</h1><p className="text-sm text-slate-500 dark:text-slate-400">{s}</p></div>;
export const Stat=({icon:I,label,value,delay=0}:{icon:any;label:string;value:string;delay?:number})=>
<Card delay={delay} className="flex items-center gap-4"><div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white"><I size={22}/></div>
<div><div className="text-2xl font-bold">{value}</div><div className="text-xs text-slate-500 dark:text-slate-400">{label}</div></div></Card>;
export const Badge=({l}:{l:Level})=><span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:C[l]+'28',color:C[l]}}>{l}</span>;
export const Loader=({t='Loading…'}:{t?:string})=><div className="flex items-center gap-2 text-cyan-500 text-sm"><Loader2 className="animate-spin" size={18}/>{t}</div>;
export const Err=({m}:{m:string})=><div role="alert" className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm border border-red-500/30">{m}</div>;
