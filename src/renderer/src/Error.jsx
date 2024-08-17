
import { Link, useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate()
    const goback = () => navigate(-1);
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-center font-extrabold capitalize'> 404 <br />Page not found </h1>
            <div className='flex gap-4 my-3  p-4'>
                <Link className='text-blue-500 underline' to={'/'}>Home</Link>

                <button onClick={goback} className='text-blue-500 underline '>Go Back</button>
            </div>
            <p className='text-gray-400'>The requested was not found or may have had an error</p>
            <p className='text-gray-400'>Take a Screenshot for reference, try to <span className='text-red-500 font-semibold'>Restart the app</span></p>
            <p className='text-gray-400'>Call +880 1677176199 if problem continues</p>

        </div>
    );
};

export default Error;