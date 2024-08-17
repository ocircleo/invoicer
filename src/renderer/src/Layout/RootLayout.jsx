/* eslint-disable prettier/prettier */
import { Outlet } from "react-router-dom";
import Activelink from "../components/Links/Activelink";
import nav from './nav.module.css'
import { useState } from "react";
import ErrorMessage from "../utls/ErrorMessage";
const RootLayout = () => {
    const [navState, setNavState] = useState(false)

    const baseLinks = [
        { path: "/items", text: "items" },
        { path: "/newInvoice", text: "New Invoice" },
        { path: "/invoices", text: "Invoices" },
        { path: "/users", text: "users" },
        { path: "/storeInfo", text: "store info" },
        // { path: "/dev", text: "Developers" },

    ]
    const toggleNav = () => setNavState(!navState)

    return (
        <div className="bg-gray-50 h-screen w-full flex">
            <div className="hidden md:w-64 bg-white h-full overflow-y-scroll md:flex flex-col gap-2 ps-3 pt-3 pb-12 ">

                <Activelink to={"/"} toggle={null}>Home</Activelink>
                {
                    baseLinks.map((ele, index) => <Activelink toggle={null} key={ele.path + index + ele.text} to={ele.path}>{ele.text}</Activelink>)
                }

            </div>

            <div className={`md:hidden top-0 w-64 bg-white h-full  flex flex-col gap-2 px-2 pt-3 pb-12 fixed duration-100 ${!navState ? "-left-64" : "left-0"} z-10`}>

                <Activelink to={"/"} toggle={toggleNav}>Home</Activelink>
                {
                    baseLinks.map((ele, index) => <Activelink toggle={toggleNav} key={ele.path + index + ele.text} to={ele.path}>{ele.text}</Activelink>)
                }

            </div>
            <div className={`h-full w-full bg-gray-900/35 fixed top-0 left-0 z-0 ${navState ? "block" : "hidden"}`} onClick={toggleNav}>


            </div>
            <div className="flex-1 bg-gray-200 overflow-y-scroll p-3 min-h-screen w-full">



                <div
                    onClick={toggleNav}
                    className={`h-10 w-10 cursor-pointer rounded  flex gap-[3px] bg-white p-1 items-center justify-center flex-col md:hidden fixed right-6 top-6 active:scale-90 duration-100`}
                >
                    <div className={`h-[6px] bg-black w-full duration-200 rounded-[2px] ${navState ? nav.active : nav.default}`}></div>
                    <div className={`h-[6px] bg-black w-full duration-200 rounded-[2px] ${navState ? nav.base : nav.baseDefault}`}></div>
                    <div className={`h-[6px] bg-black w-full duration-200 rounded-[2px] ${navState ? nav.active2 : nav.default2}`}></div>

                </div>
                <ErrorMessage></ErrorMessage>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default RootLayout;