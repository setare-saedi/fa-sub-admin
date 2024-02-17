import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AreaChartCom() {
    const data = [
        {
            name: 'فروردین',
            download: 1000,
        },
        {
            name: 'اردیبهشت',
            download: 3000,
        },
        {
            name: 'خرداد',
            download: 2000,
        },
        {
            name: 'تیر',
            download: 2780,
        },
        {
            name: 'مرداد ',
            download: 1890,
        },
        {
            name: 'شهریور',
            download: 2390,
        },
        {
            name: 'مهر',
            download: 3490,
        },
        {
            name: 'آبان',
            download: 1490,
        },
        {
            name: 'آذر',
            download: 3800,
        },
        {
            name: 'دی',
            download: 0,
        },
        {
            name: 'بهمن',
            download: 0,
        },
        {
            name: 'اسفند',
            download: 0,
        },
    ];
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                        <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="30%" stopColor="#0b6170" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#159494" stopOpacity={0.3} />
                            === ADD MORE COLOURS HERE ===
                            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
                        </linearGradient>                    </defs>
                    <Area type="monotone" dataKey="download" stroke="#0b6170" fill="url(#colorView)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

