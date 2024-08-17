import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../utls/APIHANDELER';
import { useSelector } from 'react-redux';

const Statistics = () => {
    const { readStatsAll } = useContext(DataContext)
    const { todaysStats, monthlyStats } = useSelector((state) => state.stats)
    let date = new Date()
    useEffect(() => {
        readStatsAll({ day: null, month: date.getMonth(), year: date.getFullYear(), replyTo: "readStatsAll" })
        readStatsAll({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), replyTo: "readStateOne" })


    }, [])

    return (
        <div className='w-full bg-white grid grid-cols-1 lg:grid-cols-2 gap-3 py-5'>
            <div className=' p-5'>
                <h1 className='text-center text-lg font-semibold bg-black text-white py-1 rounded'>Daily Statics</h1>
                <div className='flex flex-col gap-2 mt-5 text-lg'>
                    <p className='flex justify-between px-2'>Top Item: <span>{todaysStats?.topItem || "N/A"}</span></p>
                    <p className='flex justify-between px-2'>Income: <span>{(todaysStats?.income) ? (todaysStats?.income).toFixed(2) : 0} TK</span></p>
                    <p className='flex justify-between px-2'>Discount: <span>{(todaysStats?.discount) ? (todaysStats?.discount).toFixed(2) : 0} TK</span></p>
                    <p className='flex justify-between px-2'>Due: <span>{(todaysStats?.due) ? (todaysStats?.due).toFixed(2) : 0} Tk</span></p>
                </div>
            </div>
            <div className=' p-5'>
                <h1 className='text-center text-lg font-semibold bg-blue-400 text-white py-1 rounded'>Monthly Statics</h1>
                <div className='flex flex-col gap-2 mt-5 text-lg'>
                    <p className='flex justify-between px-2'>Top Item: <span>{monthlyStats?.topItem}</span></p>
                    <p className='flex justify-between px-2'>Income: <span>{(monthlyStats?.income) ? (monthlyStats?.income).toFixed(2) : 0} TK</span></p>
                    <p className='flex justify-between px-2'>Discount: <span>{(monthlyStats?.discount) ? (monthlyStats?.discount).toFixed(2) : 0} TK</span></p>
                    <p className='flex justify-between px-2'>Due: <span>{(monthlyStats?.due) ? (monthlyStats?.due).toFixed(2) : 0} Tk</span></p>
                </div>
            </div>

        </div>
    );
};

export default Statistics;