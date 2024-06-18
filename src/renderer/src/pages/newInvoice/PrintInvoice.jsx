import React, { useState } from 'react';

const PrintInvoice = ({ print, setPrint, data }) => {
    let months = ["January",
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
    let newItems;
    Array.isArray(data?.items) ? newItems = data?.items : newItems = [];
    const [printing, setPrinting] = useState(false);
    const printf = () => {
        setPrinting(true);
        setTimeout(() => {
            window.print()
        }, 1000)
        setTimeout(() => {
            setPrinting(false)
        }, 1000 * 2);
    }
    let initialTotal = 0;
    newItems.map(ele => {
        let { price, quantity } = ele;
        let sub = Number(price) * Number(quantity);
        initialTotal += sub;
    })
    let afterDiscount = initialTotal - Number(data?.discount) || 0;
    let due = afterDiscount - Number(data?.paid) || 0;
    let delivery = data?.delivery?.split("-") || [0,0,0];
    let month = months[Number(delivery[1])] || 1
    return (
        <div className={`${print ? "block" : "hidden"} fixed h-full w-screen bg-white  top-0 left-0 z-50  pt-20`}>
            <div className='w-full md:w-4/5 xl:w-4/6 2xl:w-3/6 bg-white h-full mx-auto border-2 border-transparent px-5'>
                <h1 className='text-2xl pb-5 font-semibold text-center underline underline-offset-8'>Manikgonj Hallmark & Gold Test</h1>
                <div className='flex justify-between items-start'>
                    <div>
                        <p className='font-semibold text-lg '>Customer Profile</p>
                        <p>Customer-ID: 0</p>
                        <p className=''> <span className=''>Name:</span> {data?.name}</p>
                        <p><span className=''>Phone:</span> {data?.phone}</p>
                        <p><span className=''>Address:</span> {data?.address}</p>

                    </div>
                    <div>
                        <p><span className=''>Box No:</span> {data?.boxNumber || "N/A"}</p>
                        <p><span className=''>Agent Name:</span> {data?.agentName}</p>
                        <p><span className=''>Delivery Date:</span> {delivery[2] + " " + month + " " + delivery[0]}</p>

                    </div>
                </div>

                <div>
                    <div className='grid grid-cols-6 mt-4 px-2 border-2 border-black  text-center'>
                        <p className='font-semibold border-r-2 py-2 border-black'>SL No:</p>
                        <p className='font-semibold  col-span-2 border-r-2 py-2 border-black'>Name</p>
                        <p className='font-semibold border-r-2 py-2 border-black'>Price</p>
                        <p className='font-semibold border-r-2 py-2 border-black'>weight</p>
                        <p className='font-semibold py-2'>Quantity</p>
                    </div>
                    {
                        newItems.map((ele, index) => <div key={ele.index} className='border-t-0 border-2  border-black  grid grid-cols-6 px-2 '>
                            <p className='col-span-1 text-center border-r-2 py-2 border-black'>{index + 1}</p>
                            <p className='col-span-2 border-r-2 py-2 border-black text-center'>{ele?.name}</p>
                            <p className='border-r-2 py-2 border-black text-center'>{ele?.price}</p>
                            <p className='border-r-2 py-2 border-black text-center'>{ele?.weight}</p>
                            <p className='py-2 text-center'>{ele?.quantity}</p>
                        </div>)
                    }
                </div>

                <div title='total' className='flex justify-between pe-2 mt-4'>
                    <div className='text-sm'>
                        <p><span className=''>Print Date:</span> {data?.day + " " + months[data?.month] + " " + data?.year}</p>
                        <p><span className=''>Time:</span> {data?.hours}: {data?.minutes} {data?.timeType}</p>
                    </div>
                    <div>
                        <p className='flex gap-6 justify-between '><span className=''>Subtotal:</span> {initialTotal} Tk</p>
                        <p className='flex gap-6 justify-between'><span className=''>Discount: </span>{data?.discount || 0} Tk</p>
                        <p className='flex gap-6 justify-between '><span className=''>Total: </span>{afterDiscount} Tk</p>
                        <p className='flex gap-6 justify-between '><span className=''>Paid: </span>{data?.paid} Tk</p>
                        <p className='flex gap-6 justify-between '><span className=''>Due: </span>{due} Tk</p>
                    </div>


                </div>


                <div className='flex justify-around items-end font-bold text-lg mt-16'>
                    <p>Customers Signature</p>
                    <div className='flex flex-col '>
                        <p className='text-md font-normal text-center'>salman</p>
                        <p>Authorized Signature</p>
                    </div>
                </div>



            </div>
            <div className={` ${printing ? "hidden" : "flex"} absolute h-15 w-full bg-gray-200 bottom-0 items-center justify-center py-2 gap-2`}>
                <button onClick={printf} className='bg-blue-500 text-white px-3 py-2 rounded capitalize w-28'>print</button>
                <button onClick={() => setPrint(false)} className='bg-red-500 text-white px-3 py-2 rounded capitalize w-28'>Close</button>
            </div>
        </div>
    );
};

export default PrintInvoice;
