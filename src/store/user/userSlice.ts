import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, payload: PayloadAction<{user: any}>)=>{
            state.user = payload.payload.user
        }
    }
})

export const {
    addUser
} = userSlice.actions
export default userSlice.reducer