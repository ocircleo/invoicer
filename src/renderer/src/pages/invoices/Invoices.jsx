import { useContext, useEffect, useState } from 'react';
import Pagination from './Pagination';
import { DataContext } from '../../utls/APIHANDELER';
import { useSelector } from 'react-redux';
import PrintInvoice from '../newInvoice/PrintInvoice';

const Invoices = () => {
    const { getInvoice } = useContext(DataContext)
    const [print, setPrint] = useState(false)
    const [current, setCurrent] = useState(0)
    const { invoices, active } = useSelector((state) => state.invoices)
    useEffect(() => getInvoice(0), [])
    return (
        <div>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-5 justify-items-center p-2 bg-white font-semibold capitalize '><p>Count</p> <p>customer name</p> <p>phone</p><p>date</p> <p>print</p></div>
                {
                    invoices.map((ele, index) => <div className='grid grid-cols-5 justify-items-center gap-2 bg-white p-2 rounded' key={index}>
                        <p>{(active * 25) + index + 1}</p>
                        <p>{ele.name}</p>
                        <p>{ele.phone}</p>
                        <p>{ele.day}-{ele.month + 1}-{ele.year}</p>
                        <button onClick={() => { setCurrent(index), setPrint(true) }} className='bg-green-500 text-white px-4 py-1 font-semibold rounded duration-100 active:scale-110'>Print</button>

                    </div>)
                }
            </div>
            <PrintInvoice print={print} setPrint={setPrint} data={invoices[current]}></PrintInvoice>
            <Pagination></Pagination>
        </div>
    );
};

export default Invoices;