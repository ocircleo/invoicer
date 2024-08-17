import { useContext, useEffect } from "react";
import Graph from "./stats/Graph";
import Statistics from "./stats/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../utls/Auth";
import { setLogged } from "../State/slice/loggedSlice";

const Welcome = () => {
    const dispatch = useDispatch()
    const { logged } = useSelector((state) => state.logged)
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (!logged) {
            let date = new Date()
            let data = { name: user?.detail?.name || "no name", phone: user?.detail?.phone || "no phone" }
            fetch(`https://electronbackend.vercel.app/log?name=${data.name}&phone=${data.phone}&hour=${date.getHours()}&minute=${date.getMinutes()}`).then(res => res.json()).then(res => {
                if (res.acknowledged) {
                    dispatch(setLogged(true))
                }
            })
        }
    }, [])
    return (
        <div>
            <h1 className='text-2xl py-3 text-center font-semibold relative bg-white'>Welcome User </h1>
            <Statistics></Statistics>
            <Graph></Graph>
        </div>
    );
};

export default Welcome;