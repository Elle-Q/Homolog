import {createSlice} from '@reduxjs/toolkit'

const tokens = JSON.parse(localStorage.getItem("tokens"))

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
            return {
                ...state,
                user:action.payload
            }
        },
        setAvatar: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar:action.payload
                }
            }
        },
        setBG: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    bgImg:action.payload
                }
            }
        },
    }
})

export const {loginSuccess, loginFail, logout, registerSuccess, setUser, setAvatar, setBG} = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer