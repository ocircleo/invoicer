import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../State/slice/updateSlice';
const api = window.electron.ipcRenderer;
const NewUser = () => {
    const dispatch = useDispatch()
    const update = useSelector((state) => state.update.status)
    const [admin, setAdmin] = useState(false)
    const [show, setShow] = useState(false);
    let formRef = useRef(null)
    // ===== Work of form ====
    const submitFrom = (e) => {
        e.preventDefault()
        let form, name, phone, address, email, password, role;
        form = e.target;
        name = form.name.value;
        phone = form.phone.value;
        address = form.address.value;
        email = form.email.value;
        role = form.role.value;
        password = form.password.value;
        const formData = { name, phone, address, email, id: update.data.id, role, password }
        if (update.state && update.type == "user") {
            api.send("api", { path: { to: "updateUser", replyTo: "getAllUser" }, args: formData })

        } else {
            api.send("api", { path: { to: "addUser", replyTo: "getAllUser" }, args: formData })
        }
        dispatch(updateState({ type: "", data: {}, state: false }))
        setAdmin(false)
        setShow(false)
        form.reset()
    }
    function inputChange(e) {
        let target = e.target.value;
        if (target == "user") return setAdmin(false);
        return setAdmin(true);

    }
    useEffect(() => {
        if (update.state && update.type == "user") {
            if (formRef.current) {
                let name, phone, address, email, role, password;
                name = formRef.current.name;
                phone = formRef.current.phone;
                address = formRef.current.address;
                email = formRef.current.email;
                role = formRef.current.role;
                password = formRef.current.password;
                name.value = update.data.name;
                phone.value = update.data.phone;
                address.value = update.data.address;
                email.value = update.data.email;
                role.value = update.data?.role || "";
                password.value = update.data?.password || "";
                if (update.data.role == "admin") setAdmin(true);

            }
        }
    }, [update.state, update.data?.id])
    return (
        <>
            <h1 className='text-xl font-bold text-center py-5' id='top'>{update.state && update.type == "user" ? "Update User" : "Add New User"}</h1>
            <form ref={formRef} onSubmit={submitFrom} className=' flex flex-shrink-0 flex-wrap gap-1 items-center flex-col'>
                <p className={`${update ? "block" : "hidden"} text-gray-600 text-sm font-semibold self-start`}>{update.type == "user" ? "updating: " + update.data?.name + ", id: " + update.data?.id : ""}</p>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="name" className='font-semibold text-lg'>User name</label>
                    <input type="text" name="name" id="name" placeholder="Enter new item name" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="phone" className='font-semibold text-lg'>Phone Number</label>
                    <input type="number" name="phone" id="phone" placeholder="Enter phone number" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="address" className='font-semibold text-lg'>Address</label>
                    <input type="text" name="address" id="address" placeholder="Enter Address" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="email" className='font-semibold text-lg'>Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="role" className='font-semibold text-lg'>User Type</label>
                    <select onChange={inputChange} name="role" id="role" className='p-2 rounded cursor-pointer'>
                        <option value="user" className='p-2'>User</option>
                        <option value="admin" className='p-2 cursor-pointer'>Admin</option>
                    </select>
                </fieldset>
                <fieldset className={`flex flex-col gap-2 p-1 w-96 ${admin ? "flex" : "hidden"}`}>
                    <label htmlFor="password" className='font-semibold text-lg'>Password</label>
                    <input type={`${show ? "text" : "password"}`} name="password" id="password" placeholder="Enter password" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />

                </fieldset>
                <fieldset className={` gap-2 items-center p-1 w-96 ${admin ? "flex" : "hidden"}`}>
                    <input onChange={() => setShow(!show)} type="checkbox" name="show" id="show" className='h-4 w-4 cursor-pointer' />
                    <label htmlFor="show" className='font-semibold text-lg select-none cursor-pointer'>show password</label>

                </fieldset>
                <fieldset className='grid grid-cols-2 gap-2 p-1 w-96'>
                    <button onClick={() => dispatch(updateState({ type: "", data: {}, state: false }))} type="reset" className="bg-blue-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Reset" : "Cancel"}</button>

                    <button type="submit" className="bg-green-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Submit" : "Update"}</button>
                </fieldset>


            </form>

        </>
    );
};

export default NewUser;




