import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
    schemaId: null,
    attestation: null,
    winner: null,
};

export const winnerSlice =createSlice({

    name:"winner",
    initialState:initialvalue,
    reducers:{
    

        setschemId:(state,action)=>{
            state.schemaId=action.payload;
        },
        setattestation:(state,action)=>{
            state.attestation=action.payload;
        },
        setwinner:(state,action)=>{
            state.winner=action.payload;
        }



    }

        
})


export const {setschemId,setattestation,setwinner}=winnerSlice.actions;

export default winnerSlice.reducer;