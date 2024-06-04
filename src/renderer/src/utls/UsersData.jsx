import React, { useContext, useEffect } from 'react';
import { DataContext } from './Provider';
let userMemo = -1;
const UsersData = () => {
    let { api, setUsers, refreshUser } = useContext(DataContext)
    api.on("getAllUser", (e, data) => {
        if (userMemo == data.resId) return;
        userMemo = data.resId;
        setUsers(data.data);

    })
    useEffect(() => {
        refreshUser()
    }, [])
    return (
        <div>

        </div>
    );
};

export default UsersData;