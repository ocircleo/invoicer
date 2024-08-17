import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from "../../State/slice/updateSlice"
const AddItem = () => {
    const update = useSelector((state) => state.update.status)
    const dispatch = useDispatch()
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
                    <input type="text" name="name" id="name" placeholder="Enter new item name" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-96'>
                    <label htmlFor="price" className='font-semibold text-lg'>Item Price</label>
                    <input type="number" name="price" id="price" placeholder="Enter Price" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required />
                </fieldset>
                <fieldset className='grid grid-cols-2 gap-2 p-1 w-96'>
                    <button onClick={() => dispatch(updateState({ type: "", data: {}, state: false }))} type="reset" className="bg-red-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Reset" : "Cancel"}</button>

                    <button type="submit" className="bg-green-500 col-span-1 py-2 rounded text-white font-semibold">{!update.state ? "Submit" : "Update"}</button>
                </fieldset>


            </form>

        </>
    );
};

export default AddItem;