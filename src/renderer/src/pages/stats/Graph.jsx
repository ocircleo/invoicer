import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataContext } from '../../utls/APIHANDELER';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`May-${label} : Income: ${(payload[0]?.value).toFixed(2)} TK`}</p>
                <p className='label'>{`Discount: ${(payload[0]?.payload?.discount).toFixed(2)} TK, Due: ${(payload[0]?.payload?.due).toFixed(2)} TK`}</p>
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
    const formRef = useRef(null)
    const { readStatsAll } = useContext(DataContext)
    const { everyDayStats } = useSelector((state) => state.stats)
    const change = (e) => {
        if (formRef.current) {
            let yearValue = formRef.current.year.value
            let monthValue = formRef.current.month.value
            readStatsAll({ day: null, month: monthValue, year: yearValue, replyTo: "readStatsAll" })
        }
    }
    return (
        <div className='bg-white w-full p-5 h-[30rem]' >
            <div className='py-4 flex  justify-between  border px-2 mb-5'>
                <p className='text-lg'>Monthly Stats Graph</p>
                <div>
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef} className='flex gap-3 flex-col md:flex-row' >
                        <fieldset className='flex gap-3 bg-white'>
                            <label htmlFor="year">Select Year</label>
                            <select name="year" id="year" className='px-3 border w-36' onChange={change} >
                                {
                                    year.map((ele, index) => <option key={index} value={`20${ele + 24}`}>{`20${ele + 24}`}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className='flex gap-3 bg-white'>
                            <label htmlFor="month">Select Month</label>
                            <select name="month" id="month" className='px-3 border w-36' onChange={change}>
                                {
                                    month.map((ele, index) => <option key={index} value={`${ele}`}>{monthInText[ele]}</option>)
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
                    data={everyDayStats}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;