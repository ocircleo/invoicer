import React, { useContext } from 'react';
import { DataContext } from '../../utls/APIHANDELER';
import { updateState } from '../../State/slice/updateSlice';
const UsersCard = ({ args }) => {

    const { api, dispatch } = useContext(DataContext)

    const updater = () => {
        dispatch(updateState({ type: "user", data: args, state: true }));
    }
    const deleter = () => {
        api.send("api", { path: { to: "deleteUser", replyTo: "getAllUser" }, args: args })
    }
    return (
        <div className='bg-white font-bold text-lg rounded py-3 px-10 grid grid-cols-7  place-items-center'>

            <p>{args?.id}</p>
            <p>{args?.name}</p>
            <p className='col-span-2'>{args?.address}</p>
            <p>{args?.phone}</p>
            <button onClick={updater} className="bg-blue-500 col-span-1 py-2 px-4 rounded text-white font-semibold active:scale-90 duration-100">Update</button>

            <button className="bg-red-500 col-span-1 py-2 px-4 rounded text-white font-semibold active:scale-90 duration-100" onClick={deleter}>Delete</button>


        </div>
    );
};

export default UsersCard;