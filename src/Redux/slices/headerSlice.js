import { createSlice } from "@reduxjs/toolkit";




const headerSlice  =  createSlice({
    name: 'header',
    initialState:[],
    reducers:{
        addToHeader :(state,action)=>{
            state.push(action.payload)
        }
    }
})


export const {addToHeader} = headerSlice.actions
export default headerSlice.reducer