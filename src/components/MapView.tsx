import {useEffect,useRef} from 'react';import L from 'leaflet';import 'leaflet/dist/leaflet.css';import {LL} from '../data';
export type Line={pts:LL[];color:string;w?:number;tip?:string};
export type Mark={pos:LL;color:string;tip:string};
export default function MapView({lines,marks=[],fit=false,h='h-[420px]'}:{lines:Line[];marks?:Mark[];fit?:boolean;h?:string}){
const el=useRef<HTMLDivElement>(null),map=useRef<L.Map>(),grp=useRef<L.LayerGroup>();
useEffect(()=>{const m=L.map(el.current!).setView([12.9716,77.5946],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(m);
grp.current=L.layerGroup().addTo(m);map.current=m;return()=>{m.remove()}},[]);
useEffect(()=>{const g=grp.current!;g.clearLayers();const all:LL[]=[];
lines.forEach(l=>{L.polyline(l.pts,{color:l.color,weight:l.w??6,opacity:.9}).bindTooltip(l.tip??'').addTo(g);all.push(...l.pts)});
marks.forEach(k=>{L.circleMarker(k.pos,{radius:9,color:'#fff',weight:2,fillColor:k.color,fillOpacity:1}).bindTooltip(k.tip).addTo(g);all.push(k.pos)});
if(fit&&all.length)map.current!.fitBounds(all,{padding:[30,30]})},[lines,marks,fit]);
return <div ref={el} className={`w-full ${h}`}/>}
