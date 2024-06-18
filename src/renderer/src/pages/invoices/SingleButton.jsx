
const SingleButton = ({ paginate, value, totalPages, active }) => {
    let what = <button onClick={() => paginate(value)} className='px-4 py-1 rounded bg-white'>{value}</button>
    if (value == 0) return what
    if (value == totalPages - 1) return what
    if (value - 1 == active) return what
    if (value + 1 == active) return what
    if (value == totalPages - 1) return <></>
    if (value == active) return what
};

export default SingleButton;