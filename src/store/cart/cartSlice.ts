import { DataListCartT } from "@/src/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {} as DataListCartT,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, payload: PayloadAction<DataListCartT>)=>{
            state.cart = payload.payload
        }
    }  
})

export const {
    addCart
} = cartSlice.actions
export default cartSlice.reducer