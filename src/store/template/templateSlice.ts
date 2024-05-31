import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getTemplate } from "./templateAction"

const initialState = {
    templateName: '',
    loading: true
}

export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        addTemplate:(state, payload: PayloadAction<{templateName: string}>)=>{
            state.templateName = payload.payload.templateName
            state.loading = false
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getTemplate.fulfilled, (state, {payload}: any)=>{
            state.templateName = payload[0].templateDir
            state.loading = false
        })
    }
})

export const {
    addTemplate
} = templateSlice.actions
export default templateSlice.reducer