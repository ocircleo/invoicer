import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateError } from '../State/slice/errorSlice';

const ErrorMessage = () => {
    const { error, message } = useSelector((state) => state.error)
    const dispatch = useDispatch()
    const closeError = () => {
        dispatch(updateError({ error: false, message: "no error" }))
    }
    useEffect(() => {
        if (error) {
            setTimeout(() => closeError(), 5000)
        }
    }, [error])
    return (
        <div style={{ zIndex: 111 }} className={`fixed p-3 font-semibold text-white bg-black bottom-2 flex justify-center gap-2 left-28  border shadow rounded duration-100  ${error ? "visible pointer-events-auto translate-x-3" : "invisible pointer-events-none z-50 translate-x-0"}`}>
            <p>Error: {message}</p>
            <p className='text-black font-semibold bg-blue-500 text-sm px-2 py-1 rounded cursor-pointer' onClick={closeError}>Close</p>
        </div>
    );
};

export default ErrorMessage;