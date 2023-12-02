import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import catReducer from "../views/admin/category/catSlice";
import adminItemSlice from "../views/admin/item/admin-item-slice";
import alertReducer from "../components/alert/ops/alertSlice";
import authReducer from "../api/authSlice";
import uploadReducer from "../views/admin/upload/uploadSlice";
import confirmReducer from "../components/alert/confirm/confirmSlice";
import refreshReducer from "./refreshSlice";
import playerReducer from "../views/app/play/playSlice";
import loadingReducer from "../components/loading/loading-slice";
import itemReducer from "../views/app/item/item-slice";
import navBarReducer from "../views/app/home/navBarSlice";
import cartReducer from "../views/app/cart/cart-slice";

export default configureStore({
    reducer: {
        catModal: catReducer,
        adminItemModal: adminItemSlice,
        itemModal: itemReducer,
        alert: alertReducer,
        auth:authReducer,
        uploadItemResc:uploadReducer,
        confirm: confirmReducer,
        refresh:refreshReducer,
        player:playerReducer,
        loadingModel:loadingReducer,
        navBar:navBarReducer,
        cart:cartReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})