import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import catReducer from "../views/admin/category/catSlice";
import adminItemSlice from "../views/admin/item/admin-item-slice";
import alertReducer from "../components/alert/ops/alertSlice";
import authReducer from "../api/authSlice";
import uploadReducer from "../views/admin/upload/uploadSlice";
import confirmReducer from "../components/alert/confirm/confirmSlice";
import refreshReducer from "./refresh-slice";
import playerReducer from "../views/app/play/playSlice";
import loadingReducer from "../components/loading/loading-slice";
import itemReducer from "../views/app/item/item-slice";
import cartReducer from "./cart-slice";
import searchReducer from "./search";

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
        cart:cartReducer,
        search: searchReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})