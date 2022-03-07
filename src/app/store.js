import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import catReducer from "../views/admin/category/catSlice";
import itemReducer from "../views/admin/item/item-slice";
import alertReducer from "../components/alert/ops/alertSlice";
import authReducer from "../api/authSlice";
import uploadReducer from "../views/admin/upload/uploadSlice";
import confirmReducer from "../components/alert/confirm/confirmSlice";
import refreshReducer from "./refreshSlice";
import playerReducer from "../views/app/play/playerSlice";

export default configureStore({
    reducer: {
        catModal: catReducer,
        itemModal: itemReducer,
        alert: alertReducer,
        auth:authReducer,
        uploadItemResc:uploadReducer,
        confirm: confirmReducer,
        refresh:refreshReducer,
        player:playerReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})