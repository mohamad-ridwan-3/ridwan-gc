import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFirstLoadSearchPage: true
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addFirstLoadSearchPage: (state, payload: PayloadAction<boolean>)=>{
            state.isFirstLoadSearchPage = payload.payload
        }
    }  
})

export const {
    addFirstLoadSearchPage
} = searchSlice.actions
export default searchSlice.reducer