import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',

    initialState: {isLogin: false,user:null},

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
                user:action.payload
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
                user:null
            }
        },
        setUser: (state, action) => {
            debugger
            return {
                ...state,
                user:action.payload
            }
        },
    }
})

export const {loginSuccess, loginFail, logout, registerSuccess, setUser} = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer