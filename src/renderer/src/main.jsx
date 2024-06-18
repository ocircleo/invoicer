import { RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from "./utls/Auth";
import { router } from "../Routes";
import { Provider } from 'react-redux'
import { store } from "./State/Store";
import APIHANDELER from "./utls/APIHANDELER";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth>
      <Provider store={store}>
        <APIHANDELER>
          <RouterProvider router={router} />
        </APIHANDELER>
      </Provider>
    </Auth>
  </React.StrictMode>
)
