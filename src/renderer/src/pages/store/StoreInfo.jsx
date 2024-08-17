import { useContext, useEffect } from "react";
import { DataContext } from "../../utls/APIHANDELER";
import { useSelector } from "react-redux";



const StoreInfo = () => {
    const { api, getStoreInfo } = useContext(DataContext)

    const { info } = useSelector((state) => state.store)
    console.log("rerendered");
    let infoData = info[0]
    const submitForm = (e) => {
        e.preventDefault()
        let form = e.target;
        let name, phone, email, website, owners, address
        name = form.name.value;
        phone = form.phone.value
        email = form.email.value
        address = form.address.value
        owners = form.owners.value
        website = form.owners.value
        api.send("api", { path: { to: "writeStoreInfo", replyTo: "storeInfo" }, args: [{ name, phone, email, website, owners, address }] })
    }
    useEffect(() => {
        getStoreInfo()
    }, [])
    return (
        <div className="h-auto min-h-full w-full text-gray-700 font-semibold bg-white p-5  relative">
            <form onSubmit={submitForm} className="flex flex-col items-center justify-center w-full md:w-5/6 lg:w-4/6 mx-auto  gap-4">
                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="name" className='font-semibold text-lg'>Store Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter Store Name" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required defaultValue={infoData?.name} />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="phone" className='font-semibold text-lg'>Phone Number</label>
                    <input type="number" name="phone" id="phone" placeholder="Enter Phone Number" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required defaultValue={infoData?.phone} />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="email" className='font-semibold text-lg'>Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email Address" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required defaultValue={infoData?.email} />
                </fieldset>

                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="owners" className='font-semibold text-lg'>Owned By</label>
                    <input type="text" name="owners" id="owners" placeholder="Enter Owners Names" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required defaultValue={infoData?.owners} />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="address" className='font-semibold text-lg'>Address</label>
                    <input type="text" name="address" id="address" placeholder="Enter Address" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' required defaultValue={infoData?.address} />
                </fieldset>
                <fieldset className='flex flex-col gap-2 p-1 w-full'>
                    <label htmlFor="website" className='font-semibold text-lg'>Website</label>
                    <input type="text" name="website" id="website" placeholder="Enter Your Website" className='w-full min-w-72 p-2 rounded border  border-b-2 outline-none border-b-blue-500' defaultValue={infoData?.website} />
                </fieldset>
                <button className="bg-blue-500 text-white font-semibold w-full rounded py-2 duration-100 active:scale-95" type="submit">Update</button>
            </form>
            <h2 className="text-center mt-12 font-semibold text-lg">Developer Contact:</h2>
            <div className=" mx-auto bg-gray-50 flex items-center justify-center flex-col lg:flex-row gap-3">
                <p>Email: salmanhossain11222626@gmail.com</p>
                <p>Call: +88 01677176199</p>
            </div>
        </div>
    );
};

export default StoreInfo;