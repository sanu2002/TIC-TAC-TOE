import { createSlice } from "@reduxjs/toolkit";


const initialvalue={
        client: null,
        schemaId: null,
        attestation: null,
        winner: '',
    
}

export const winnerSlice =createSlice({

    name:"winner",
    initialState:initialvalue,
    reducers:{
        setclient:(state,action)=>{
            state.client=action.payload;
        },

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


export const {setclient,setschemId,setattestation,setwinner}=winnerSlice.actions;

export default winnerSlice.reducer;