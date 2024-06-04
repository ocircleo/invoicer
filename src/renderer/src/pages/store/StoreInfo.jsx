import React, { useContext } from 'react';
import { DataContext } from '../../utls/Provider';

const StoreInfo = () => {
    const { api } = useContext(DataContext)
    const test = () => {
        api.send("api", { path: { to: "getInvoice", replyTo: "getInvoice" }, args: { page: 41 } })
    }
    api.on("/getInvoice", (e, data) => console.log(data))
    return (
        <div>
            <button onClick={test}>test get invoice</button>
        </div>
    );
};

export default StoreInfo;