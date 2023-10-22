import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

const loadStateFromLocalStorage = () => {
    try {
        const serializedSorage = localStorage.getItem("authState")
        return serializedSorage ? JSON.parse(serializedSorage) : initialState
    } catch (error){
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("authState", serializedState)
    } catch (error) {
        console.error(error)
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: loadStateFromLocalStorage(),
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            saveStateToLocalStorage(state)
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem("authState")
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer