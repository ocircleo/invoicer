import AddItem from './AddItem';
import AllItems from './AllItems';


const Items = () => {
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <AddItem></AddItem>
            <AllItems></AllItems>
        </div>
    );
};

export default Items;