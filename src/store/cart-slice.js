import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        open: false,
    },
    reducers: {
        closeCart: state => {
            return {
                ...state,
                open: false
            }
        },
        openCart: (state, action) => {
            return {
                ...state,
                open: true,
            }
        },

    }
})

export const {closeCart, openCart} = cartSlice.actions
export const selectCart = state => state.cart

export default cartSlice.reducer