import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    modalTitle: "",
    modalContent: null,
    modalAction: null,
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true
            state.modalTitle = action.payload.title
            state.modalContent = action.payload.content
            state.modalAction = action.payload.action
        },
        closeModal: (state) => {
            state.isModalOpen = false
            state.modalTitle = ""
            state.modalContent = null
            state.modalAction = null
        },
    }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer