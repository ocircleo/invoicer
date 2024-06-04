import React, { useContext, useEffect } from 'react';
import NewUser from './NewUser';
import AllUsers from './AllUsers';
import { DataContext } from '../../utls/Provider';

const Users = () => {
    const { api, setUsers } = useContext(DataContext)

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <NewUser></NewUser>
            <AllUsers></AllUsers>
        </div>
    );
};

export default Users;