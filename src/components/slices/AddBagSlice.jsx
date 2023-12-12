import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAddBag = createAsyncThunk("addbag", async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`http://localhost:3004/addbag`)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
});

export const PostAddBag = createAsyncThunk("post", async (data, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:3004/addbag", data)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
})

const AddBagSlice = createSlice({
    name: "addbag",
    initialState: {
        loading: false,
        error: '',
        addbag: [],
    },
    extraReducers: {
        [GetAddBag.pending]: state => {
            state.loading = true
        },
        [GetAddBag.fulfilled]: (state, action) => {
            state.loading = false
            state.addbag = action.payload
        },
        [GetAddBag.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }, reducers: {
        clearAddBag: (state) => {
            state.addbag = [];
        },
    }
})
export const { clearAddBag } = AddBagSlice.actions;
export default AddBagSlice.reducer;