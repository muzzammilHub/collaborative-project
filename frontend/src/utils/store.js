import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./doctorSlice";
import userSlice from "./userSlice";
import appointmentSLice from "./appointmentSLice";

const store = configureStore({
    reducer: {
        doctor: doctorSlice,
        user: userSlice,
        appointment: appointmentSLice
    }
})

export default store