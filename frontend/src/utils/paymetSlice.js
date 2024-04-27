import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState:{
        payment:null
    },
    reducers:{
        addpayment: (state, action)=>{
            state.payment = action.payload
        },
        removepayment: (state, action)=>{
            state.payment = null
        }
    }
})


export const {addpayment, removepayment} = paymentSlice.actions

export default paymentSlice.reducer