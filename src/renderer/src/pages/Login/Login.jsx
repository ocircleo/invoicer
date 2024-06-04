import { useContext, useState } from 'react';
import { AuthContext } from '../../utls/Auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    let api = window.electron.ipcRenderer;
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(AuthContext)
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const handelLogin = (e) => {
        e.preventDefault();
        let form = e.target;
        let phone = form.number.value, password = form.password.value;
        let args = { phone, password }
        api.send("api", { path: { to: "login", replyTo: "login" }, args })
    }
    api.on("login", (e, data) => {
        if (data.found) {
            setUser({ logged: true, detail: data.user })
            navigate("/");
        } else {
            Swal.fire({
                title: "User not found",
                icon: "error",
            })
        }
    })
    return (
        <div>
            <div className="">
                <div className="lg:flex lg:justify-center lg:items-center flex-col w-full h-screen">
                    <div className="bg-white  my-10 rounded w-full md:w-[450px] mx-auto">
                        <form onSubmit={handelLogin} className="w-full">
                            <h1 className="text-3xl font-bold text-center pb-10 capitalize">Please Login</h1>
                            <fieldset className=" mb-2">
                                <p className='text-lg py-2 font-semibold'>Enter Phone Number</p>
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="Number"
                                    className="w-full p-2 rounded border-2 border-black outline-none focus:outline-none focus:border-indigo-400 bg-white focus:bg-white"
                                    required
                                />
                            </fieldset>
                            <fieldset className="form-control mt-2">
                                <p className='text-lg py-2 font-semibold'>Enter Password</p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full p-2 rounded border-2 border-black outline-none focus:outline-none focus:border-indigo-400 bg-white focus:bg-white"
                                    required
                                />
                                <div
                                    className="self-start flex items-center gap-2 my-2 ms-2 select-none cursor-pointer"
                                    onClick={togglePassword}
                                >
                                    <input
                                        type="checkbox"
                                        name=""
                                        checked={showPassword ? true : false}
                                        id=""
                                        className="h-4 w-4 "
                                    />
                                    <p className="pb-1">show password</p>
                                </div>
                            </fieldset>
                            <fieldset className="form-control mt-4 flex justify-center items-center ">
                                <button
                                    className=" py-2 bg-gray-800 border-2 border-black rounded-lg text-white font-semibold text-lg px-5 w-full hover:bg-white hover:text-black hover:border-black"

                                >Login</button>
                            </fieldset>



                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default Login;