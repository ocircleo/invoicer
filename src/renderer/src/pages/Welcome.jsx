import Graph from "./stats/Graph";
import Statistics from "./stats/Statistics";

const Welcome = () => {
    return (
        <div>
            <h1 className='text-2xl py-3 text-center font-semibold relative bg-white'>Welcome User </h1>
            <Statistics></Statistics>
            <Graph></Graph>
        </div>
    );
};

export default Welcome;