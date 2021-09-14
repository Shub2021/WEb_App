import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({title,data,dataKey1,dataKey2,dataKey3,grid}) {
    
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd"/>
                    <Line type="monotone" dataKey={dataKey1}/>
                    {/* <Line type="monotone" dataKey={dataKey2}/>
                    <Line type="monotone" dataKey={dataKey3}/> */}
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
