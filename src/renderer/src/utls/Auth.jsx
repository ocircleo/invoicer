import { createContext, useState } from "react";

export const AuthContext = createContext(null)

const Auth = ({ children }) => {
    const [user, setUser] = useState({ logged: true, detail: {} });
    let data = { user, setUser }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth;