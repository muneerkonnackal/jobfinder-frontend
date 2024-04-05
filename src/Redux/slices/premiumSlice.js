import { createSlice } from "@reduxjs/toolkit";



const premiumSlice = createSlice({
    name: 'premium',
    initialState:[],  //premiumlist have more users
    reducers:{
        //actions
        //function / logic to add items intopremium array
        addToPremium :(state,action)=>{
                state.push(action.payload);
        }
    } 
})


export const {addToPremium} = premiumSlice.actions
export default premiumSlice.reducer