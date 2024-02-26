import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',

    initialState: {isLogin: false},

    reducers: {
        registerSuccess: (state, action) => {
            return {
                ...state,
                isLogin: false,
            }
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                isLogin: true,
            }
        },
        loginFail: (state, action) => {
            return {
                ...state,
                isLogin: false,
            }
        },
        logout: (state) => {
            return {
                ...state,
                isLogin: false,
            }
        },
    }
})

export const {loginSuccess, loginFail, logout, registerSuccess} = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer