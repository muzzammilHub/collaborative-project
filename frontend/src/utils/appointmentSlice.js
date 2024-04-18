import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState:{
        appointment:null
    },
    reducers:{
        addAppointment: (state, action)=>{
            state.appointment = action.payload
        },
        removeAppointment: (state, action)=>{
            state.appointment = null
        }
    }
})


export const {addAppointment, removeAppointment} = appointmentSlice.actions

export default appointmentSlice.reducer