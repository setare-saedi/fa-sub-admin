import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const GradientColors = () => {
  return (
    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
    <stop offset="30%" stopColor="#0b6170" stopOpacity={0.4} />
    <stop offset="75%" stopColor="#159494" stopOpacity={0.3} />
    === ADD MORE COLOURS HERE ===
    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
</linearGradient> 
  );
};

const MyGraph = ({ data }) => {

  let maxY= Math.max(...data.map(o => o.download));
  return (
    <div style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}

        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#8884d8"
            opacity={0.4}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#000" }}
            stroke="#EEEEEE" />
          <YAxis
            dataKey='download'
            tick={{ fill: "#000" }}
            stroke="#EEEEEE"
            type="number" domain={[0, maxY]}
          />

          <Tooltip
            itemStyle={{ color: "#fff", backgroundColor: "#0b6170", padding: "4px" }}
            contentStyle={{ backgroundColor: "#fff", color:"#0b6170", fontWeight:"bold" }}
          />

          <defs>
            <GradientColors />
           </defs>
          <Area type="monotone" dataKey="download" stroke="#0b6170" fill="url(#colorView)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MyGraph;