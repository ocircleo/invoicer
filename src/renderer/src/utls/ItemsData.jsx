// import React, { useContext, useEffect } from 'react';
// import { DataContext } from './Provider';
// let itemsMemo = -1;
// const ItemsData = () => {
//     let { api, refreshItem, setItems } = useContext(DataContext);
//     api.on("getItem", (e, data) => {
//         if (itemsMemo == data.resId) return;
//         itemsMemo == data.resId;
//         setItems(data.data)
//     })
//     useEffect(() => {
//         refreshItem()
//     }, [])
//     return (
//         <div>

//         </div>
//     );
// };

// export default ItemsData;