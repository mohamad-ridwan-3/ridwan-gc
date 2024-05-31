import { ResultCollectionsT } from "@/src/types/navbar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    collections: {} as ResultCollectionsT
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        addCollections: (state, payload: PayloadAction<ResultCollectionsT>)=>{
            state.collections = payload.payload
        }
    }  
})

export const {
    addCollections
} = navbarSlice.actions
export default navbarSlice.reducer