import { configureStore } from "@reduxjs/toolkit";
import premiumSlice from "./slices/premiumSlice";
import headerSlice from "./slices/headerSlice";



const store = configureStore({
    reducer:{
        premiumReducer:premiumSlice,
        headerReducer:headerSlice
    }
})


export default store

//store globally accessible akkan route component ine providertag il place cheyyanam