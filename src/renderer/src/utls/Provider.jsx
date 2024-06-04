import { createContext, useState } from "react";

export const DataContext = createContext(null)

const Provider = ({ children }) => {
    const api = window.electron.ipcRenderer;
    const [items, setItems] = useState([])
    const [invoices, setInvoices] = useState([])
    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState({ type: "", data: {}, state: false })
    console.log("rendered");
    const refreshItem = () => {
        api.send("api", { path: { to: "getItem", replyTo: "getItem" }, args: { id: null } })
    }
    const refreshUser = () => {
        api.send("api", { path: { to: "getUser", replyTo: "getAllUser" }, args: { id: null } })
    }
  
    const updateFunc = (para) => {
        setUpdate(para);
    }
    let data = { api, items, invoices, users, update, setItems, setUsers, setUpdate, refreshItem, refreshUser, updateFunc }
    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    );
};

export default Provider;