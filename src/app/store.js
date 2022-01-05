import { configureStore } from '@reduxjs/toolkit'
import catReducer from "../features/manage/category/catSlice";
import alertReducer from "../features/alert/alertSlice";
import authReducer from "../api/authSlice";

export default configureStore({
    reducer: {
        catModal: catReducer,
        alert: alertReducer,
        auth:authReducer,
    }
})