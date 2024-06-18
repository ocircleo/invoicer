import NewUser from './NewUser';
import AllUsers from './AllUsers';

const Users = () => {

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <NewUser></NewUser>
            <AllUsers></AllUsers>
        </div>
    );
};

export default Users;