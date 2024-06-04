
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            welcome to about page
            <Link className='text-blue-500 underline px-5' to={'/'}>Home</Link>
        </div>
    );
};

export default About;