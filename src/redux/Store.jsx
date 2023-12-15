import { configureStore } from "@reduxjs/toolkit";
import BoardsReducer from "./BoardSlice";
import TasksReducer from "./TasksSlice";

export const store = configureStore({
    reducer : {
        boards : BoardsReducer,
        tasks : TasksReducer
    }
    
})