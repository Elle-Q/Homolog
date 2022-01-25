import { configureStore } from '@reduxjs/toolkit'
import catReducer from "../views/admin/category/catSlice";
import itemReducer from "../views/admin/item/item-slice";
import alertReducer from "../features/alert/alertSlice";
import authReducer from "../api/authSlice";

export default configureStore({
    reducer: {
        catModal: catReducer,
        itemModal: itemReducer,
        alert: alertReducer,
        auth:authReducer,
    }
})