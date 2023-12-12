import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetCategory = createAsyncThunk("category", async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`http://localhost:3004/category`)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
});

const CategorySlice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        error: '',
        category: [],
    },
    extraReducers: {
        [GetCategory.pending]: state => {
            state.loading = true
        },
        [GetCategory.fulfilled]: (state, action) => {
            state.loading = false
            state.category = action.payload
        },
        [GetCategory.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
export default CategorySlice.reducer;