import { configureStore } from "@reduxjs/toolkit";
import template from "./template/templateSlice";
import domain from './domain/domainSlice'
import user from './user/userSlice'
import cart from './cart/cartSlice'
import search from './search/searchSlice'
import navbar from './navbar/navbarSlice'

export const store = configureStore({
    reducer: {
        template,
        domain,
        user,
        cart,
        search,
        navbar
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch