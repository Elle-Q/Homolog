import {createSlice} from '@reduxjs/toolkit'

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState: {
        show: true,
    },
    reducers: {
        setNavBarShow: (state, action) => {
            return {
                ...state,
                show:action.payload,
            }
        },
    }
})

export const {setNavBarShow} = navBarSlice.actions

export const selectShowNavBar = state => state.navBar

export default navBarSlice.reducer