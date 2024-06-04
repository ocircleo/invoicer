
import { Link, useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    const goback = () => navigate(-1);
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-center font-extrabold capitalize'> 404 <br />Page not found</h1>
            <div className='flex gap-4 my-3  p-4'>
                <Link className='text-blue-500 underline' to={'/'}>Home</Link>

                <button onClick={goback} className='text-blue-500 underline '>Go Back</button>
            </div>
            <p className='text-gray-400'>The requested page is under construction</p>
            <p className='text-gray-400'>Call +88 01677176199 for more info</p>

        </div>
    );
};

export default Error;