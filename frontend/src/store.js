import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import modalSlice from "./reducers/modalSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        modal: modalSlice
    }
})

export default store