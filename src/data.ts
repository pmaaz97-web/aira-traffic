// Realistic sample data (Bengaluru). Replace with live API feeds when available.
export type Level='Low'|'Medium'|'High';
export type LL=[number,number];
export type Settings={dark:boolean;fuelPrice:number;kmpl:number;avoidToll:boolean;avoidTraffic:boolean};
export const C:Record<Level,string>={Low:'#22c55e',Medium:'#f59e0b',High:'#ef4444'};
export const lvl=(v:number):Level=>v<35?'Low':v<65?'Medium':'High';
export const hours=Array.from({length:24},(_,i)=>`${i}:00`);
export const density=[8,6,5,5,8,18,42,78,92,70,55,52,58,54,56,66,85,95,80,58,40,28,18,12];
export const weekly={days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],avg:[61,58,63,66,72,48,35]};
export const segments:{name:string;p:LL[];v:number}[]=[
{name:'MG Road',p:[[12.9756,77.6068],[12.9716,77.5946],[12.9698,77.58]],v:82},
{name:'Outer Ring Rd',p:[[12.9352,77.6245],[12.9592,77.6974],[12.9698,77.7499]],v:91},
{name:'Hosur Road',p:[[12.9166,77.6101],[12.8996,77.6228],[12.8399,77.6770]],v:48},
{name:'Tumkur Road',p:[[13.0298,77.5409],[13.0475,77.5120],[13.0827,77.4716]],v:22},
{name:'Bannerghatta Rd',p:[[12.9279,77.6014],[12.8892,77.5974],[12.8631,77.5970]],v:58}];
export type Inc={id:number;type:'Accident'|'Roadblock'|'Construction';title:string;pos:LL;sev:Level;time:string;sent?:boolean};
export const incidents:Inc[]=[
{id:1,type:'Accident',title:'Two-vehicle collision, Silk Board junction',pos:[12.9177,77.6233],sev:'High',time:'4 min ago'},
{id:2,type:'Construction',title:'Metro work, left lane closed on Hosur Rd',pos:[12.9005,77.6225],sev:'Medium',time:'1 h ago'},
{id:3,type:'Roadblock',title:'Procession near Town Hall, detour via JC Road',pos:[12.9634,77.5855],sev:'Medium',time:'22 min ago'},
{id:4,type:'Construction',title:'Resurfacing on Tumkur Road',pos:[13.0475,77.512],sev:'Low',time:'3 h ago'}];
export const signals=[{id:'S-101',name:'Silk Board',green:45,sug:62,queue:38},{id:'S-102',name:'KR Puram',green:40,sug:55,queue:31},{id:'S-103',name:'MG Road',green:50,sug:52,queue:12},{id:'S-104',name:'Hebbal',green:35,sug:48,queue:27}];
export const suggestions=['Leave 25 min before 8:00 AM to skip the Outer Ring Rd peak.','Silk Board is blocked; use Bannerghatta Rd to save about 14 min.','Rain expected at 6 PM; allow 18% extra time on arterial roads.','Tumkur Road is clear, the fastest northbound corridor right now.'];
export const weatherSample={Clear:{f:1,i:'0%'},Rain:{f:1.25,i:'+25%'},Fog:{f:1.15,i:'+15%'}};
