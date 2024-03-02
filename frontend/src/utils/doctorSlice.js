import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name: 'doctor',
    initialState:{
        doctor:null
    },
    reducers:{
        addDoctor: (state, action)=>{
            state.doctor = action.payload
        },
        removeDoctor: (state, action)=>{
            state.doctor = null
        }
    }
})


export const {addDoctor, removeDoctor} = doctorSlice.actions

export default doctorSlice.reducer