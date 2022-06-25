import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    showSpiner: false,
}

export const PostSlice = createSlice({
    name: "postBook",
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.data = action.payload
        },
        showModal: (state, action) => {
            state.showModal = action.payload
        },
        setSpinner: (state, action) => {
            state.showSpiner = action.payload
        }
    }
})


export const { setItem, showModal, setSpinner } = PostSlice.actions
export default PostSlice.reducer