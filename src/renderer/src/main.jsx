import { HashRouter, Routes, Route, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import RootLayout from './Layout/RootLayout'
import Error from './Error';
import About from "./pages/About";
import Welcome from "./pages/Welcome";
import Provider from "./utls/Provider";
import Items from "./pages/items/Items";
import Invoices from "./pages/invoices/Invoices";
import NewInvoice from "./pages/newInvoice/NewInvoice";
import Users from "./pages/users/Users";
import Auth from "./utls/Auth";
import { router } from "../Routes";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth>
      <Provider>
        <RouterProvider router={router} />
        {/* <HashRouter>
          <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route index path="/" element={<Welcome />} />
              <Route path="/items" element={<Items />} />
              <Route path="about" element={<About />} />
              <Route path="/newInvoice" element={< NewInvoice />} />
              <Route path="/invoices" element={< Invoices />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </HashRouter> */}
      </Provider>
    </Auth>

  </React.StrictMode>
)
