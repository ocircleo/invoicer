import UsersCard from "./UsersCard";
import { useSelector } from "react-redux";



const AllUsers = () => {
    const users = useSelector(state => state.users.users)
    return (
        <>
            <h3 className='text-2xl font-semibold mt-10'>All Users ({users?.length || 0})</h3>
            <div className='w-full lg:w-5/6 flex flex-col gap-4 mt-5'>
                <div className='bg-white font-bold text-lg rounded py-3 px-10 grid grid-cols-7  place-items-center'>

                    <p>Id</p>
                    <p>User Name</p>
                    <p className="col-span-2">Address</p>
                    <p>Phone</p>
                    <p>Update</p>
                    <p>Delete</p>
                </div>
                {
                    users.map((ele, index) => <UsersCard key={index} args={ele} ></UsersCard>)
                }
            </div>
        </>
    );
};

export default AllUsers;