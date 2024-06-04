import { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import { DataContext } from '../../utls/Provider';
let memos = 0;
const AddItem = () => {
    const { refreshItem, update, setUpdate } = useContext(DataContext)
    const api = window.electron.ipcRenderer;
    let formRef = useRef(null)
    // ===== Work of form ====
    const submitFrom = (e) => {
        e.preventDefault()
        let form, name, price;
        form = e.target;
        name = form.name.value;
        price = form.price.value;
        const formData = { name, price, id: update.data.id }
        if (update.state && update.type == "item") {
            api.send("api", { path: { to: "updateItem", replyTo: "addItem" }, args: formData })

        } else {
            api.send("api", { path: { to: "addItem", replyTo: "addItem" }, args: formData })
        }
        form.reset()
    }
    api.on("addItem", (e, data) => {
        if (memos == data.resId) return;
        memos = data.resId;
        if (data.error) {
            Swal.fire({
                title: data.message,
                icon: "error",
            })
        } else {
            Swal.fire({
                title: "Success full",
                icon: "success"
            }).then((result) => {
                if (formRef.current) formRef.current.reset()
                setUpdate({ type: "", data: {}, state: false })
                refreshItem()
            });
        }
    })

    useEffect(() => {
        if (update.state && update.type == "item") {
            if (formRef.current) {
                let name = formRef.current.name;
                let price = formRef.current.price;
                name.value = update.data.name;
                price.value = update.data.price;
            }
        }
    }, [update.state, update.data?.id])
    return (
        <>
            <h1 className='text-xl font-bold text-center py-5' id='top'>{update.state && update.type == "item" ? "Update Item" : "Add New Item"}</h1>
            <form ref={formRef} onSubmit={submitFrom} className=' flex flex-shrink-0 flex-wrap gap-1 items-center flex-col'>
                <p className={`${update ? "block" : "hidden"} text-gray-600 text-sm font-semibold self-start`}>{update.type == "item" ? "updating: " + update.data?.name + ", id: " + update.data?.id : ""}</p>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="name" className='font-semibold text-lg'>Item name</label>
                    <input type="text" name="name" id="name" placeholder="Enter new item name" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="price" className='font-semibold text-lg'>Item Price</label>
                    <input type="number" name="price" id="price" placeholder="Enter Price" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                </fieldset>
                <fieldset className='grid grid-cols-2 gap-2 p-1 w-96'>
                    <button onClick={() => setUpdate({ type: "", data: {}, state: false })} type="reset" className="bg-blue-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Reset" : "Cancel"}</button>

                    <button type="submit" className="bg-green-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Submit" : "Update"}</button>
                </fieldset>


            </form>

        </>
    );
};

export default AddItem;