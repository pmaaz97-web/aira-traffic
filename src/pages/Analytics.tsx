import {Bar,Doughnut,Line} from 'react-chartjs-2';import {Card,PageHead,Title} from '../components/ui';import {C,weekly} from '../data';
export default function Analytics(){const o={plugins:{legend:{display:false}}};
return <><PageHead t="Traffic Analytics" s="History and insights from the past 7 days"/>
<div className="grid lg:grid-cols-3 gap-4"><Card className="lg:col-span-2"><Title>Average congestion by day</Title>
<Line data={{labels:weekly.days,datasets:[{data:weekly.avg,borderColor:'#3b82f6',backgroundColor:'rgba(59,130,246,.2)',fill:true,tension:.4}]}} options={o}/></Card>
<Card delay={.05}><Title>Time spent by congestion level</Title><Doughnut data={{labels:['Low','Medium','High'],datasets:[{data:[46,34,20],backgroundColor:[C.Low,C.Medium,C.High],borderWidth:0}]}} options={{plugins:{legend:{position:'bottom'}},cutout:'68%'}}/></Card>
<Card delay={.1} className="lg:col-span-3"><Title>Incidents by type, last 6 months</Title>
<Bar data={{labels:['May','Jun','Jul','Aug','Sep','Oct'],datasets:[{label:'Accidents',data:[22,26,31,28,19,24],backgroundColor:'#ef4444'},{label:'Roadblocks',data:[10,12,9,14,11,13],backgroundColor:'#f59e0b'},{label:'Construction',data:[15,18,20,17,22,25],backgroundColor:'#22d3ee'}]}} options={{scales:{x:{stacked:true},y:{stacked:true}}}}/></Card></div></>}
