


const StoreInfo = () => {
    return (
        <div className="h-full w-full text-gray-700 font-semibold bg-white p-5 ">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 my-5">
                <div className="flex items-start flex-col justify-center ps-8">
                <h1 className="text-3xl py-8 font-semibold ">Manikgonj Hallmark & Gold Test</h1>
                <p>Address: 123, Manikgonj, Dhaka</p>
                <p>phone: +880 1677176199</p>
                <p>Email: Manikgonj@gmail.com</p>
                </div>
                <img src="." alt=""  className="h-96 bg-gray-200 w-full rounded-md"/>
            </div>
            <div className="flex items-center justify-center text-lg flex-col mt-12">
                <p className="text-xl">Owner: Debobroto Sarker Dipto</p>
                <p>Open: 9:00 AM - 9:00 PM</p>
            </div>
        </div>
    );
};

export default StoreInfo;