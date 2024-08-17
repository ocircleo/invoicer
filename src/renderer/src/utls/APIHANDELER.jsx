import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { items } from "../State/slice/ItemSlice";
import { updateState } from "../State/slice/updateSlice";
import { users } from "../State/slice/userSlice";
import { invoiceCount } from "../State/slice/InvoiceCountSlice";
import { invoices } from "../State/slice/invoiceSlice";
import { setEveryDayStats, setMonthlyStats, setTodaysStats } from "../State/slice/statisticsSlice";
import { updateError } from "../State/slice/errorSlice";
import { storeUpdate } from "../State/slice/storeSlice";
import { AuthContext } from "./Auth";
export const DataContext = createContext(null)

const APIHANDELER = ({ children }) => {
    const { user } = useContext(AuthContext)
    const api = window.electron.ipcRenderer;
    console.log("rerendered");
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
    const getStoreInfo = () => {
        api.send("api", { path: { to: "getStoreInfo", replyTo: "storeInfo" } })
    }
    api.on("readStatsAll", (e, data) => {
        let { month, items } = data
        let array = []
        let topItems = []
        let index = 1;
        let totalIncome = 0, discount = 0, due = 0, topItem = "N/A";
        for (const day in month) {
            month[day].Month = index
            array.push(month[day])
            topItems.push(items[day])
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
        if (topItems.length != 0) {
            let obj = {}
            topItems.map(ele => {
                for (let xx in ele) {
                    obj[xx] ? obj[xx] += Number(ele[xx]) : obj[xx] = Number(ele[xx])
                }
            })
            let prevCount = 0;
            for (let item in obj) {
                if (obj[item] > prevCount) {
                    prevCount = obj[item];
                    topItem = item
                }
            }
        }
        dispatch(setMonthlyStats({ topItem: topItem, income: totalIncome, discount: discount, due: due }))
        dispatch(setEveryDayStats(array))
    })
    api.on("readStateOne", (e, data) => {
        let { items, month } = data
        let topItem = "N/A"
        let obj = {}

        for (let xx in items) {
            obj[xx] ? obj[xx] += Number([xx]) : obj[xx] = Number(items[xx])
        }
        let prevCount = 0;
        for (let item in obj) {
            if (obj[item] > prevCount) {
                prevCount = obj[item];
                topItem = item
            }
        }
        dispatch(setTodaysStats({ topItem: topItem, income: month.income, discount: month.discount, due: month.due }))
    })
    api.on("getItem", (e, data) => { dispatch(items(data.data)) })
    api.on("addItem", (e, data) => {
        if (data.error) {
            dispatch(updateError({ error: true, message: data?.message }))
        } else {
            refreshItem()
            dispatch(updateState({ type: "", data: {}, state: false }))
        }
    })
    api.on("getInvoice", (e, data) => { dispatch(invoices(data.invoices)) })
    api.on("getAllUser", (e, data) => {
        if (data.error) {
            dispatch(updateError({ error: true, message: data?.message }))
        } else {
            dispatch(users(data.data))
        }
    })
    api.on("storeInfo", (e, data) => {
        dispatch(storeUpdate(data.data))
    })
    api.on("getTotalPages", (e, data) => { dispatch(invoiceCount(data.length)) })
    let data = { api, refreshItem, refreshUser, dispatch, getInvoice, getPagination, readStatsAll, getStoreInfo }
    useEffect(() => {
        if (user.logged) {
            refreshUser()
            refreshItem()
        }
    }, [user])
    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    );
};

export default APIHANDELER;