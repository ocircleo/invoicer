
import { Link } from 'react-router-dom';

const Welcome = () => {
    const api = window.electron.ipcRenderer;
    const check = () => api.send("checkStatus");
    const write = () => api.send("writeStatus");
    const apiTest = () => api.send("api", { path: "addItem", args: "salman" })

    api.on("status", (e, data) => console.log(data))
    api.on("writeStatus", (e, data) => console.log(data))
    return (
        <div>
            <h1 className='text-xl text-center font-semibold relative'>Welcome User <span  className='h-full w-full bg-red-300 absolute left-0  translate-x-full duration-500'></span> </h1>
        </div>
    );
};

export default Welcome;