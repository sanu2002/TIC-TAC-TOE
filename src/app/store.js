import { configureStore } from '@reduxjs/toolkit';
import  winnerReducers  from '../features/Slicedata';

const store=configureStore({
    reducer:{
        winner:winnerReducers,
    },

    // middleware:(getDefaultMiddleware)=>{
    //     return getDefaultMiddleware({
    //         serializableCheck:false,
    //     })
    // }


})


export default store;