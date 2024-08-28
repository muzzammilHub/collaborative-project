import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState:{
        user: null,
        isPrescriptionSend: false
    },
    reducers: {
        addUser: (state, action)=>{
           state.user =  action.payload
        },
        removeUser: (state, action)=>{
            state.user = null
        },
        prescriptionSend : (state, action)=>{
            state.isPrescriptionSend = true
        }
    }
})

export const {addUser, removeUser, prescriptionSend} = userSlice.actions

export default userSlice.reducer