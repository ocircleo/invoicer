import { useState } from "react";
import Activelink from "./Activelink";

const LinkCompo = ({ title, links, active }) => {
    const [show, setShow] = useState(Boolean(active))
    return (
        <div className="flex flex-col py-1 border-2 rounded-lg px-1 border-slate-400">
            <button onClick={() => setShow(!show)} className={`text-lg hover:bg-indigo-600 capitalize text-center  text-black py-1 rounded flex justify-around items-baseline cursor-pointer  ${show ? "mb-2 bg-indigo-500" : "mb-0 bg-slate-300"} font-semibold`}>{title}</button>
            <div className={`flex flex-col gap-2 px-1 overflow-hidden ${show ? "h-auto" : "h-0"}`}>
                {
                    links.map((ele, index) => <Activelink key={ele.path + index + ele.text} to={ele.path}>{ele.text}</Activelink>)
                }
            </div>
        </div>
    );
};

export default LinkCompo;