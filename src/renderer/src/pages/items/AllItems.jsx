
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";


const AllItems = () => {
const items = useSelector((state)=> state.items.items)
    return (
        <>
            <h3 className='text-2xl font-semibold mt-10'>All Items</h3>
            <div className='w-full lg:w-5/6 flex flex-col gap-4 mt-5'>
                <div className='bg-blue-500 text-white font-semibold text-lg rounded py-3 px-10 grid grid-cols-5  place-items-center'>

                    <p>Id</p>
                    <p>Item Name</p>
                    <p>Price</p>
                    <p>Update</p>
                    <p>Delete</p>

                </div>
                {
                    items.map((ele, index) => <SingleItem key={index} args={ele} ></SingleItem>)
                }
            </div>
        </>
    );
};

export default AllItems;