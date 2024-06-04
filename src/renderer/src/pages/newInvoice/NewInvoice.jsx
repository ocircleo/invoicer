import { useContext, useRef, useState } from "react";
import PrintInvoice from "./PrintInvoice";
import { DataContext } from "../../utls/Provider";
const NewInvoice = () => {
    const { items, users, api } = useContext(DataContext)
    const [print, setPrint] = useState(false)
    const [data, setData] = useState({})
    const [calc, setCalc] = useState({ subtotal: 0, discount: 0, total: 0, paid: 0, due: 0 })
    let formRef = useRef(null)
    let summeryRef = useRef(null)
    let fieldRef = useRef(null)
    const saveToDB = (data) => {
        api.send("api", { path: { to: "addInvoice", replyTo: null }, args: data })
    }
    const calculate = (e) => {
        if (formRef.current) {
            e.preventDefault();
            let form = formRef.current;
            let items = [], paid, discount;
            paid = form.paid.value;
            discount = form.discount.value;
            let field = document.getElementById("field")
            let childElements = field.children;
            let count = 0;
            let item = {}
            for (let i = 0; i <= childElements.length; i++) {
                if (count == 4) {
                    items.push(item)
                    count = 0;
                    item = {}
                }
                if (childElements.length == i) continue;
                switch (count) {
                    case 0: item.name = childElements[i].children[1].value;
                        break
                    case 1: item.price = childElements[i].children[1].value;
                        break
                    case 2: item.weight = childElements[i].children[1].value;
                        break
                    case 3: item.quantity = childElements[i].children[1].value;
                        break
                }
                count++;
            }
            let initialTotal = 0;
            items.map(ele => {
                let { price, quantity } = ele;
                let sub = Number(price) * Number(quantity);
                initialTotal += sub;
            })
            let afterDiscount = initialTotal - Number(discount) || 0;
            let due = afterDiscount - Number(paid) || 0;
            setCalc({ subtotal: initialTotal, discount: discount, total: afterDiscount, paid: paid, due: due })
            console.log({ initialTotal, afterDiscount, paid, due });
        }
    }
    const submitFrom = (e) => {
        e.preventDefault();
        let form = e.target;
        let name, phone, agentName, agentPhone, boxNumber, caret, discount, paid, delivery, address, items = [];
        name = form.name.value;
        phone = form.phone.value;
        agentName = form.agentName.value;
        agentPhone = form.agentPhone.value;
        boxNumber = form.box.value;
        caret = form.caret.value;
        discount = form.discount.value;
        paid = form.paid.value;
        delivery = form.delivery.value;
        address = form.address.value;
        let invoiceData = { name, phone, agentName, agentPhone, boxNumber, caret, discount, paid, delivery, address, items }
        let field = document.getElementById("field")
        let childElements = field.children;
        let count = 0;
        let item = {}
        for (let i = 0; i <= childElements.length; i++) {
            if (count == 4) {
                items.push(item)
                count = 0;
                item = {}
            }
            if (childElements.length == i) continue;
            switch (count) {
                case 0: item.name = childElements[i].children[1].value;
                    break
                case 1: item.price = childElements[i].children[1].value;
                    break
                case 2: item.weight = childElements[i].children[1].value;
                    break
                case 3: item.quantity = childElements[i].children[1].value;
                    break
            }
            count++;
        }
        let date = new Date();
        invoiceData.year = date.getFullYear(), invoiceData.month = date.getMonth(), invoiceData.day = date.getDate(), invoiceData.minutes = date.getMinutes(), invoiceData.hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), invoiceData.timeType = date.getHours() > 12 ? "PM" : "AM";
        console.table(invoiceData);
        saveToDB(invoiceData);
        setData(invoiceData)
        setPrint(true)

    }
    const fillInfo = (e, data) => {
        let target = e.target;
        let name, phone, address;
        name = document.getElementById("name")
        phone = document.getElementById("phone")
        address = document.getElementById("address")
        name.value = data.name;
        phone.value = data.phone;
        address.value = data.address;
        if (target.classList.contains("fill")) {
            target.parentElement.innerHTML = "";
        } else if (target.parentElement.classList.contains("fill")) {
            target.parentElement.parentElement.innerHTML = ""
        }

    }
    const userInfoFill = (e) => {
        let target = e.target;
        let parentDiv = e.target.parentElement.children[2];
        let text = target.value;
        let result = users.filter(ele => {
            return ele.name.toLowerCase().includes(text.toLowerCase())
        })
        if (!parentDiv.classList.contains("fill-active")) {
            parentDiv.classList.add("fill-active");
        }
        parentDiv.innerHTML = ""
        result.forEach(ele => {
            let div = document.createElement("div")
            div.classList.add("flex", "justify-evenly", "bg-white", "border", "border-blue-400", "py-1", "cursor-pointer", "duration-100", "active:scale-95", "fill", "z-10");
            div.innerHTML = `
            <p> ${ele.name}</p>
            <p> ${ele.address}</p>
            `
            div.addEventListener("click", e => fillInfo(e, ele))
            parentDiv.appendChild(div)

        })
    }
    const ItemSearch = (text) => {
        return items.filter(e => {
            return e.name.toLowerCase().includes(text.toLowerCase())
        })
    }
    const handelClick = (e) => {
        if (!e.target.classList.contains("fill")) {
            let fillActive = document.getElementsByClassName("fill-active")[0]
            if (fillActive) {
                fillActive.innerHTML = "";
                fillActive.classList.remove("fill-active")
            }

        } else if (!e.target.parentElement?.parentElement?.classList?.contains("fill")) {
            let fillActive = document.getElementsByClassName("fill-active")[0]
            if (fillActive) {
                fillActive.innerHTML = "";
                fillActive.classList.remove("fill-active")
            }
        }
    }

    const fillItUp = (e, ele) => {
        let target = e.target.classList.contains("fill") ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
        let field = target
        let id = field.getAttribute("data-id");
        let input = field.children[1]
        input.value = ele.name;
        let price = document.getElementsByClassName(id);
        price[1].children[1].value = ele.price;
    }
    const autoFill = (e) => {
        let parent, parentDiv, target = e.target, value = target.value;
        parent = target.parentElement;
        parentDiv = parent.children[2];
        let elements = ItemSearch(value)
        parentDiv.innerHTML = "";
        if (!parentDiv.classList.contains("fill-active")) {

            parentDiv.classList.add("fill-active");
        }
        elements.forEach(ele => {
            let div = document.createElement("div")
            div.classList.add("flex", "justify-evenly", "bg-white", "border", "border-blue-400", "py-1", "cursor-pointer", "duration-100", "active:scale-95", "fill", "z-10");
            div.innerHTML = `
            <p> ${ele.name}</p>
            <p> ${ele.price}</p>
            `
            div.addEventListener("click", e => fillItUp(e, ele))
            parentDiv.appendChild(div)

        })

    }
    const deleteField = (e) => {
        if (fieldRef.current) {
            let target = e.target.parentElement;
            let id = target.getAttribute("data-id")
            let fields = document.getElementsByClassName(id);
            for (let i = 0; i < fields.length; i++) {
                fieldRef.current.removeChild(fields[i]);
            }
            return fields.length != 0 ? deleteField(e) : null
        }
    }
    const generateId = () => Math.ceil(Math.random() * 100)
    const makeField = (type, name, placeholder, labelText) => {
        let fieldSet = document.createElement("fieldset");
        let label = document.createElement("label");
        let input = document.createElement("input");
        let div = document.createElement("div");

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("absolute", "right-0", "bg-red-600", "text-white", "text-sm", "rounded", "px-2", "py-1", "duration-100", "active:scale-95");
        deleteBtn.innerText = "Delete";
        deleteBtn.setAttribute("type", "button")
        deleteBtn.addEventListener("click", e => deleteField(e))

        label.classList.add("font-semibold", "text-lg", "capitalize");
        label.innerText = labelText;

        input.setAttribute("type", type);
        input.setAttribute("name", name);
        input.setAttribute("placeholder", placeholder);
        input.setAttribute("required", true)
        input.classList.add("w-full", "p-2", "rounded", "group", "border-b-2", "outline-none", "border-blue-500")

        switch (name) {
            case "item": {
                fieldSet.classList.add("flex", "flex-col", "gap-2", "p-1", "col-span-5", "lg:col-span-2", "relative")
                div.classList.add("capitalize", "absolute", "max-h-44", "w-full", "top-full", "left-0", "rounded", "flex-col", "gap-2", "p-1", "overflow-y-scroll", "z-50")
                input.addEventListener("keyup", e => autoFill(e));
                break;
            }
            case "price": {
                fieldSet.classList.add("flex", "flex-col", "gap-2", "p-1", "col-span-5", "md:col-span-2", "lg:col-span-1")
                break;
            }
            case "weight": {
                fieldSet.classList.add("flex", "flex-col", "gap-2", "p-1", "col-span-5", "md:col-span-2", "lg:col-span-1")
                input.defaultValue = 1;
                break;
            }
            case "quantity": {
                fieldSet.classList.add("flex", "flex-col", "gap-2", "p-1", "col-span-5", "md:col-span-1", "relative")
                input.defaultValue = 1;
                break;
            }
        }

        fieldSet.appendChild(label);
        fieldSet.appendChild(input);
        name == "item" ? fieldSet.appendChild(div) : null;
        name == "quantity" ? fieldSet.appendChild(deleteBtn) : null;
        return fieldSet;
    }
    const addField = () => {
        let id = generateId().toString() + generateId().toString() + generateId().toString() + generateId().toString();
        if (fieldRef.current) {
            let div = fieldRef.current;
            let name = makeField("text", "item", "Enter Item Name", "Item Name");
            let price = makeField("number", "price", "Enter price", "Price");
            let weight = makeField("text", "weight", "Enter Weight", "weight");
            let quantity = makeField("number", "quantity", "Enter Quantity", "Quantity");
            name.classList.add(id)
            price.classList.add(id)
            weight.classList.add(id)
            quantity.classList.add(id)
            name.setAttribute("data-id", id);
            quantity.setAttribute("data-id", id);
            div.appendChild(name)
            div.appendChild(price)
            div.appendChild(weight)
            div.appendChild(quantity)
        }
    }
    return (
        <div onClick={handelClick} className="bg-gray-100">
            <h1 className='text-xl font-bold text-center py-5' id='top'>Create New Invoice</h1>
            <form ref={formRef} onSubmit={submitFrom} className='flex flex-col justify-center items-center'>
                <div id="field" ref={fieldRef} className="grid grid-cols-5 gap-2 w-full px-12 items-center ">
                    <fieldset className='flex flex-col gap-2 p-1  col-span-5 lg:col-span-2 relative 1234' data-id="1234">
                        <label htmlFor="item" className='font-semibold text-lg' >Item name</label>
                        <input type="text" required={true} name="item" placeholder="Enter new item name" onChange={autoFill} className='w-full p-2 rounded group border-b-2 outline-none border-blue-500 ' />
                        <div className="capitalize absolute max-h-44 w-full top-full left-0 rounded flex-col gap-2 p-1 overflow-y-scroll z-50">

                        </div>

                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 col-span-5 md:col-span-2 lg:col-span-1 1234'>
                        <label htmlFor="price" className='font-semibold text-lg'>Item Price</label>
                        <input type="number" required={true} name="price" placeholder="Enter Price" className='w-full  p-2 rounded  border-b-2 outline-none border-blue-500 1234' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 col-span-5 md:col-span-2 lg:col-span-1'>
                        <label htmlFor="weight" className='font-semibold text-lg'>Weight</label>
                        <input type="text" required={true} defaultValue={1} name="weight" placeholder="Enter Weight" className='w-full  p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 col-span-5 md:col-span-1'>
                        <label htmlFor="quantity" className='font-semibold text-lg'>Quantity</label>
                        <input type="number" required={true} defaultValue={1} name="quantity" placeholder="Enter quantity" className='w-full p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                </div>
                <button onClick={addField} type="button" className="text-white bg-blue-500 px-4 py-2 font-semibold rounded mt-3 duration-100 active:scale-90">Add Item</button>
                <div className="flex  gap-1 shrink flex-wrap  justify-center items-center capitalize">

                    <fieldset className='flex flex-col gap-2 p-1 w-96 relative'>
                        <label htmlFor="name" className='font-semibold text-lg'> name</label>
                        <input onChange={userInfoFill} type="text" required={true} name="name" id="name" placeholder="Enter new item name" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                        <div className="capitalize absolute max-h-44 w-full top-full left-0 rounded flex-col gap-2 p-1 overflow-y-scroll z-50">

                        </div>
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="phone" required={true} className='font-semibold text-lg'>phone</label>
                        <input type="number" name="phone" id="phone" placeholder="Enter Price" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="address" className='font-semibold text-lg'>address</label>
                        <input type="text" name="address" id="address" placeholder="Enter address" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="agentName" className='font-semibold text-lg'>agent name</label>
                        <input type="text" name="agentName" id="agentName" placeholder="Enter agentName" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="agentPhone" className='font-semibold text-lg'>Agent phone</label>
                        <input type="number" name="agentPhone" id="agentPhone" placeholder="Enter agent Phone" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="delivery" className='font-semibold text-lg'>delivery Date</label>
                        <input type="date" required={true} name="delivery" id="delivery" placeholder="Delivery date" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="box" className='font-semibold text-lg'>box number</label>
                        <input type="text" name="box" id="box" placeholder="Enter box number" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="caret" className='font-semibold text-lg'>caret</label>
                        <input type="number" name="caret" id="caret" placeholder="Enter caret" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="paid" className='font-semibold text-lg'>paid</label>
                        <input type="number" required={true} name="paid" id="paid" placeholder="paid amount" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                    <fieldset className='flex flex-col gap-2 p-1 w-96'>
                        <label htmlFor="discount" className='font-semibold text-lg'>discount</label>
                        <input type="text" name="discount" defaultValue={0} id="discount" placeholder="Enter discount" className='w-full min-w-72 p-2 rounded  border-b-2 outline-none border-blue-500' />
                    </fieldset>
                </div>
                <div className="flex gap-2 flex-shrink flex-wrap items-center justify-center mt-12">

                    <fieldset className='w-80'>
                        <button type="submit" className="bg-green-500   py-2 rounded text-white font-semibold w-full">Generate Invoice</button>
                    </fieldset>
                    <fieldset onClick={calculate} className='w-80 '>
                        <button type="button" className="bg-blue-500   py-2 rounded text-white font-semibold w-full">Calculate</button>
                    </fieldset>
                    <fieldset className='w-80'>
                        <button type="reset" className="bg-red-500   py-2 rounded text-white font-semibold w-full">Reset</button>
                    </fieldset>
                </div>


            </form>
            <div className="overflow-hidden my-12">

                <div ref={summeryRef} className="flex flex-wrap justify-center gap-5 text-xl   bg-white border-t-2  hover:-skew-x-12 hover:scale-110 duration-100 p-3 ">
                    <p><span className='font-semibold'>Subtotal:</span> {calc?.subtotal || 0} Tk</p>
                    <p><span className='font-semibold'>Discount: </span>{calc?.discount || 0} Tk</p>
                    <p><span className='font-semibold'>Total: </span>{calc?.paid || 0} Tk</p>
                    <p><span className='font-semibold'>Paid: </span>{calc?.paid || 0} Tk</p>
                    <p><span className='font-semibold'>Due: </span>{calc?.due || 0} Tk</p>
                </div>
            </div>
            <PrintInvoice print={print} setPrint={setPrint} data={data}></PrintInvoice>
        </div>
    );
};
export default NewInvoice;