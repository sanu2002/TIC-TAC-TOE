import { configureStore } from '@reduxjs/toolkit';
import  winnerReducer  from '../features/Slicedata';

const store=configureStore({
    reducer:{
        winner:winnerReducer,
    },



})


export default store;