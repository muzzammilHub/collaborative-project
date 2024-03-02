import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctorSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        doctor: doctorSlice,
        user: userSlice
    }
})

export default store