import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        open: false,
        items: [],
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
        addItem: (state, action) => {
            if (state.items.filter(item => item.id === action.payload.id).length > 0) return
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        },
    }
})

export const {closeCart, openCart,addItem} = cartSlice.actions
export const selectCart = state => state.cart

export default cartSlice.reducer