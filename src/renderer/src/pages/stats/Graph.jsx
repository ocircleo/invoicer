import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [];

for (let i = 0; i < 31; i++) {
    let xx = {
        name: i + 1,
        uv: 14000,
        pv: 12400,
        amt: 2400,
    }
    data.push(xx)
}
const getIntroOfPage = (label) => {
    if (label === 'Page A') {
        return "Page A is about men's clothing";
    }
    if (label === 'Page B') {
        return "Page B is about women's dress";
    }
    if (label === 'Page C') {
        return "Page C is about women's bag";
    }
    if (label === 'Page D') {
        return 'Page D is about household goods';
    }
    if (label === 'Page E') {
        return 'Page E is about food';
    }
    if (label === 'Page F') {
        return 'Page F is about baby food';
    }
    return '';
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`May-${label} : Income: ${payload[0].value} TK`}</p>
                <p className="intro">{getIntroOfPage(label)}</p>
                <p className="desc">Anything you want can be displayed here.</p>
            </div>
        );
    }

    return null;
};
let year = [...Array(37).keys()]
let month = [...Array(12).keys()]
let monthInText = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]
const Graph = () => {
    return (
        <div className='bg-white w-full p-5 h-[30rem]' >
            <div className='py-4 flex  justify-between  border px-2 mb-5'>
                <p className='text-lg'>Monthly Stats Graph</p>
                <div>
                    <form onSubmit={(e) => e.preventDefault()} className='flex gap-3 flex-col md:flex-row' >
                        <fieldset className='flex gap-3 bg-white'>
                            <label htmlFor="year">Select Year</label>
                            <select name="year" id="year" className='px-3 border w-36'>
                                {
                                    year.map(ele => <option value={`202${ele + 23}`}>{`20${ele + 24}`}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className='flex gap-3 bg-white'>
                            <label htmlFor="month">Select Month</label>
                            <select name="month" id="month" className='px-3 border w-36'>
                                {
                                    month.map(ele => <option value={`${ele}`}>{monthInText[ele]}</option>)
                                }
                            </select>
                        </fieldset>
                    </form>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="90%" >
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis dataKey="Income"/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;