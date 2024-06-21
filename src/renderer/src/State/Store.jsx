import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from "./slice/ItemSlice"
import itemsCountReducer from "./slice/InvoiceCountSlice"
import invoiceReducer from "./slice/invoiceSlice"
import userReducer from "./slice/userSlice"
import updateReducer from "./slice/updateSlice"
import statsReducer from './slice/statisticsSlice'
export const store = configureStore({
    reducer: {
        items: itemsReducer,
        itemsCount: itemsCountReducer,
        invoices: invoiceReducer,
        users: userReducer,
        update: updateReducer,
        stats: statsReducer
    },
})