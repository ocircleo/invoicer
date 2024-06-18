import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { items } from "../State/slice/ItemSlice";
import { updateState } from "../State/slice/updateSlice";
import { users } from "../State/slice/userSlice";
import { invoiceCount } from "../State/slice/InvoiceCountSlice";
import { invoices } from "../State/slice/invoiceSlice";
export const DataContext = createContext(null)

const APIHANDELER = ({ children }) => {
    console.log("rerendered");
    const api = window.electron.ipcRenderer;
    let dispatch = useDispatch();
    const refreshItem = () => {
        api.send("api", { path: { to: "getItem", replyTo: "getItem" }, args: { id: null } })
    }
    const refreshUser = () => {
        api.send("api", { path: { to: "getUser", replyTo: "getAllUser" }, args: { id: null } })
    }
    const getInvoice = (page) => {
        api.send("api", { path: { to: "getInvoice", replyTo: "getInvoice" }, args: { page: page } })
    }
    const getPagination = () => {
        api.send("api", { path: { to: "getTotalPages", replyTo: "getTotalPages" }, data: null })
    }
    api.on("getItem", (e, data) => { dispatch(items(data.data)) })
    api.on("addItem", (e, data) => {
        if (data.error) {
            console.log(data);
        } else {
            refreshItem()
            dispatch(updateState({ type: "", data: {}, state: false }))
        }
    })
    api.on("getInvoice", (e, data) => { dispatch(invoices(data.invoices)) })
    api.on("getAllUser", (e, data) => dispatch(users(data.data)))
    api.on("getTotalPages", (e, data) => { dispatch(invoiceCount(data.length)) })
    let data = { api, refreshItem, refreshUser, dispatch, getInvoice, getPagination }
    useEffect(() => {
        refreshUser()
        refreshItem()
    }, [])
    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    );
};

export default APIHANDELER;