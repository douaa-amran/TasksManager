import { configureStore } from "@reduxjs/toolkit";
import BoardsReducer from "./BoardSlice";

export const store = configureStore({
    reducer : {
        boards : BoardsReducer
    }
    
})