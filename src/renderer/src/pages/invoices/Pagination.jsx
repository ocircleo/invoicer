import { useContext, useEffect, useRef } from "react";
import { DataContext } from "../../utls/APIHANDELER";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../State/slice/invoiceSlice";
const Pagination = () => {
    const dispatch = useDispatch()
    const { getPagination, getInvoice } = useContext(DataContext)
    const inputRef = useRef(null)
    const totalInvoices = useSelector((state) => state.itemsCount.count)
    const { active } = useSelector((state) => state.invoices)
    let pageButtons = [...new Array(Math.ceil(totalInvoices / 25)).keys()]

    const paginate = (para) => {
        getInvoice(Number(para))
        dispatch(setActive(Number(para)));

    }
    const formPaginate = (e) => {
        e.preventDefault()
        const number = e.target.number.value;
        if (number >= pageButtons.length - 1) {
            getInvoice(pageButtons.length - 1)
            dispatch(setActive(pageButtons.length - 1));

        } else if (number <= 0) {
            getInvoice(0)
            dispatch(setActive(0));
        } else {
            getInvoice(Number(number))
            dispatch(setActive(Number(number)))
        }
    }
    const buttonPaginate = (para) => {
        if (para === 'prev') {
            if (active == 0) return null;
            if (inputRef.current && active - 1 != 0) inputRef.current.value = active - 1;
            getInvoice(active - 1)
            dispatch(setActive(active - 1))
        }
        if (para == "next") {
            if (active == pageButtons.length - 1) return null;
            if (inputRef.current && active + 1 != (pageButtons.length - 1)) inputRef.current.value = active + 1;
            getInvoice(active + 1);
            dispatch(setActive(active + 1))

        }
    }
    useEffect(() => getPagination(), [])
    return (
        <div className=" bg-orange-400 sticky w-full -bottom-3 py-4">

            <div className="flex items-center gap-2 justify-center ">

                {/* {
                    pageButtons.map(ele => <SingleButton paginate={paginate} key={ele} active={active} totalPages={pageButtons.length} value={ele}></SingleButton>)
                } */}

                <button className='font-bold px-4 py-1 rounded bg-white border-2 hover:border-black border-transparent active:scale-75 duration-100' onClick={() => buttonPaginate("prev")}>&lt;</button>
                <button onClick={() => paginate(0)} className={`px-4 py-1 rounded bg-white duration-100 active:scale-90 ${active == 0 ? "border-2 border-black" : ""}`}>{0}</button>
                <form onSubmit={formPaginate}><input ref={inputRef} type="number" name="number" className={`bg-white  rounded outline-transparent w-16 p-1 ${active != (pageButtons.length - 1) && active != 0 ? "border-2 border-black" : ""}`} defaultValue={1} /></form>
                <button onClick={() => paginate(pageButtons.length - 1)} className={`px-4 py-1 rounded bg-white ${active == pageButtons.length - 1 ? "border-2 border-black" : ""}`}>{pageButtons.length - 1}</button>
                <button className='font-bold px-4 py-1 rounded bg-white border-2 hover:border-black border-transparent active:scale-75 duration-100' onClick={() => buttonPaginate("next")}>&gt;</button>
            </div>
        </div>
    );
};

export default Pagination;