import { createHashRouter } from "react-router-dom";
import RootLayout from "./src/Layout/RootLayout";
import Private from "./src/utls/Private";
import Login from "./src/pages/Login/Login";
import Welcome from "./src/pages/Welcome";
import Items from "./src/pages/items/Items";
import About from "./src/pages/About";
import NewInvoice from "./src/pages/newInvoice/NewInvoice";
import Invoices from "./src/pages/invoices/Invoices";
import Users from "./src/pages/users/Users";
import Error from "./src/Error";
import StoreInfo from "./src/pages/store/StoreInfo";

const router = createHashRouter([
    {
        path: "/",
        element: <Private><RootLayout></RootLayout></Private>,
        errorElement: <Error />,
        children: [{
            path: "/",
            element: <Welcome></Welcome>

        }, {
            path: "items",
            element: <Items></Items>

        }, {
            path: "about",
            element: <About></About>
        }, {
            path: "/newInvoice",
            element: <NewInvoice></NewInvoice>

        }, {
            path: "invoices",
            element: <Invoices></Invoices>
        }, {
            path: "users",
            element: <Users></Users>
        }, {
            path: "storeInfo",
            element: <StoreInfo></StoreInfo>
        }
        ],
    }, {
        path: "login",
        element: <Login />
    }
])
export { router }