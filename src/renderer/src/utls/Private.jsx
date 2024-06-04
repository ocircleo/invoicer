import React, { useContext, useEffect } from 'react';
import { AuthContext } from './Auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Private = ({ children }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();


    if (user.logged) {
        return (
            <>
                {children}
            </>
        );
    } else {
        return (<Navigate
            to={"/login"}
            replace={true}
        ></Navigate>)
    }
};

export default Private;