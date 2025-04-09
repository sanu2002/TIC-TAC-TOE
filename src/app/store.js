import { configureStore } from '@reduxjs/toolkit';
import  winnerSlice  from '../features/Slicedata';
const store=configureStore({
    reducer:{
        winner:winnerSlice,
    },

    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            serializableCheck:false,
        })
    }


})


export default store;