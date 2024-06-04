import { NavLink } from 'react-router-dom';

const Activelink = ({ to, toggle, children }) => {
    return (
        <NavLink onClick={toggle} to={to} className={({ isActive, isPending }) => isActive ? "bg-black text-center py-1 rounded font-semibold capitalize text-lg hover:bg-indigo-600 text-white duration-100" : isPending ? "bg-blue-300 text-center py-1 rounded font-semibold capitalize text-lg" : "bg-slate-300 text-center py-1 rounded font-semibold capitalize text-lg hover:bg-indigo-600 hover:text-white duration-100"}>
            {children}
        </NavLink>
    );
};

export default Activelink;