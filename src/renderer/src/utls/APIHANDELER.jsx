import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { items } from "../State/slice/ItemSlice";
import { updateState } from "../State/slice/updateSlice";
import { users } from "../State/slice/userSlice";
import { invoiceCount } from "../State/slice/InvoiceCountSlice";
import { invoices } from "../State/slice/invoiceSlice";
import { setEveryDayStats, setMonthlyStats } from "../State/slice/statisticsSlice";
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
    const readStatsAll = ({ day, month, year, replyTo }) => {
        api.send("api", { path: { to: "readStatsAll", replyTo: replyTo }, args: { day, month, year } })
    }
    api.on("readStatsAll", (e, data) => {
        let { month, items } = data
        let array = []
        let index = 1;
        let totalIncome = 0, discount = 0, due = 0;
        for (const day in month) {
            month[day].Month = index

            array.push(month[day])
            index++;
            totalIncome += Number(month[day].income)
            discount += Number(month[day].discount)
            due += Number(month[day].due)
        }
        if (array.length == 0) {
            for (let i = 0; i < 30; i++) {
                array.push({ Month: i + 1, income: 0, discount: 0, due: 0 })
            }
        }
        console.log(totalIncome, discount, due);
        dispatch(setMonthlyStats({ income: totalIncome, discount: discount, due: due }))
        dispatch(setEveryDayStats(array))
    })
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
    let data = { api, refreshItem, refreshUser, dispatch, getInvoice, getPagination, readStatsAll }
    useEffect(() => {
        refreshUser()
        refreshItem()
    }, [])
    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    );
};

export default APIHANDELER;