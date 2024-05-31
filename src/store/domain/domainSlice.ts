import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDomainAccess: null
}

export const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {
        addDomainAccess:(state, payload: PayloadAction<{isDomainAccess: boolean | null}>)=>{
            state.isDomainAccess = payload.payload.isDomainAccess as null
        },
        resetDomainAccess:(state, payload: PayloadAction<{isDomainAccess: boolean | null}>)=>{
            state.isDomainAccess = null
        },
    },
})

export const {
    addDomainAccess,
    resetDomainAccess
} = domainSlice.actions
export default domainSlice.reducer