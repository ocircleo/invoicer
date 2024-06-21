import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../utls/APIHANDELER';
import { useSelector } from 'react-redux';

const Statistics = () => {
    const { readStatsAll } = useContext(DataContext)
    const { todaysStats, monthlyStats } = useSelector((state) => state.stats)
    let date = new Date()
    useEffect(() => readStatsAll({ day: null, month: date.getMonth(), year: date.getFullYear(), replyTo: "readStatsAll" }), [])
    return (
        <div className='w-full bg-white grid grid-cols-1 lg:grid-cols-2 gap-3 py-5'>
            <button onClick={readStatsAll}>click</button>
            <div className=' p-5'>
                <h1 className='text-center text-lg font-semibold bg-black text-white py-1 rounded'>Daily Statics</h1>
                <div className='flex flex-col gap-2 mt-5 text-lg'>
                    <p className='flex justify-between px-2'>Top Item: <span>salman</span></p>
                    <p className='flex justify-between px-2'>Income: <span>343400 TK</span></p>
                    <p className='flex justify-between px-2'>Discount: <span>0 TK</span></p>
                    <p className='flex justify-between px-2'>Due: <span>2000 Tk</span></p>
                </div>
            </div>
            <div className=' p-5'>
                <h1 className='text-center text-lg font-semibold bg-blue-400 text-white py-1 rounded'>Monthly Statics</h1>
                <div className='flex flex-col gap-2 mt-5 text-lg'>
                    <p className='flex justify-between px-2'>Top Item: <span>salman</span></p>
                    <p className='flex justify-between px-2'>Income: <span>{monthlyStats.income} TK</span></p>
                    <p className='flex justify-between px-2'>Discount: <span>{monthlyStats.discount} TK</span></p>
                    <p className='flex justify-between px-2'>Due: <span>{monthlyStats.due} Tk</span></p>
                </div>
            </div>

        </div>
    );
};

export default Statistics;