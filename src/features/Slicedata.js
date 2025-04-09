import { createSlice } from "@reduxjs/toolkit";


const initialvalue={
        schemaId: 1,
        attestation: 100,
        winner: 'xx',
    
}

export const winnerSlice =createSlice({

    name:[],
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


export const {setclient,setschemId,setattestation,setwinner}=winnerSlice.actions;

export default winnerSlice.reducer;