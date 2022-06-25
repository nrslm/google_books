import { configureStore } from '@reduxjs/toolkit'
import GetBooksSlice from '../components/features/getBooks/GetBooksSlice'
import GetOneBookSlice from '../components/features/getBook/GetBookSlice'

export const store = configureStore({
    reducer: {
        get: GetBooksSlice,
        getOne: GetOneBookSlice
    },
})