import React from 'react';

const Statistics = () => {
    return (
        <div className='w-full bg-white grid grid-cols-1 lg:grid-cols-2 gap-3 py-5'>
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
                    <p className='flex justify-between px-2'>Income: <span>343400 TK</span></p>
                    <p className='flex justify-between px-2'>Discount: <span>0 TK</span></p>
                    <p className='flex justify-between px-2'>Due: <span>2000 Tk</span></p>
                </div>
            </div>

        </div>
    );
};

export default Statistics;