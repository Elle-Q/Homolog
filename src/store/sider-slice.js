import {createSlice} from '@reduxjs/toolkit'

export const siderSlice = createSlice({
    name: 'sider',
    initialState: {
        open: false,
        show: 'cart',
        order: {}
    },
    reducers: {
        closeSider: state => {
            return {
                ...state,
                open: false
            }
        },
        openSider: (state, action) => {
            return {
                ...state,
                open: true,
            }
        },
        setShow: (state, action) => {
            return {
                ...state,
                show: action.payload,
            }
        },
        setData: (state, action) => {
            return {
                ...state,
                order: action.payload,
            }
        },
    }
})

export const {closeSider, openSider, setShow,setData} = siderSlice.actions
export const selectSider = state => state.sider

export default siderSlice.reducer