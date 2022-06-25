import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const pageCount = 20

const initialState = {
    data: [],
    showSpiner: false,
    showModal: false,
    page: { startIndex: 0, reachedLimit: false }
}

export const getPosts = createAsyncThunk('posts/getPosts',
    async (text, { rejectWithValue, dispatch }) => {
        const { searchText, category, rev, startIndex } = text;
        const params = {
            key: 'AIzaSyCsxbwDN9quTs6gPYZeIcbvNftyHosSr8c',
            q: searchText,
            maxResults: 20,
            startIndex: startIndex
        };

        if (category) params['subject'] = category
        if (rev) params["orderBy"] = rev
        dispatch(setSpinner(true));
        try {
            const res = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                params: params
            })
            dispatch(startIndex > 0 ? addItems(res.data) : setItems(res.data))
            dispatch(updateStartIndex(pageCount))
        } catch (e) {
        }
        dispatch(setSpinner(false));
    }
)


export const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.page.reachedLimit = action.payload.items.length == pageCount
            state.data = action.payload.items
        },
        addItems: (state, action) => {
            state.page.reachedLimit = action.payload.items.length == pageCount
            const newArray = [...state.data, ...action.payload.items]
            state.data = newArray
        },
        showModal: (state, action) => {
            state.showModal = action.payload
        },
        updateStartIndex: (state, action) => {
            state.startIndex = action.payload
        },
        setSpinner: (state, action) => {
            state.showSpiner = action.payload
        },
        showMore: (state, action) => {
            state.page.startIndex = state.page.startIndex
        }
    }
})

export const { setItems, showModal, setSpinner, showMore, addItems, updateStartIndex } = PostSlice.actions
export default PostSlice.reducer