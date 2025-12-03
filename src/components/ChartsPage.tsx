import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface Training {
    activity: string;
    duration: number;
}

export default function ChartsPage() {
    const [data, setData] = useState<{ activity: string, minutes: number }[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(res => res.json())
            .then((trainings: Training[]) => {
                const summary: { [key: string]: number } = {};
                trainings.forEach(t => {
                    if (!summary[t.activity]) summary[t.activity] = 0;
                    summary[t.activity] += t.duration;
                });

                const chartData = Object.keys(summary).map(key => ({
                    activity: key,
                    minutes: summary[key]
                }));

                setData(chartData);
            })
            .catch(err => console.error(err));
    }

    return (
        <div style={{ width: "100%", height: 500, padding: "20px" }}>
            <h2>Activity in minutes</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minutes" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}     
