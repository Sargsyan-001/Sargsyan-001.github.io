import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAddBagColect = createAsyncThunk("addbagcolect", async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`http://localhost:3004/addbagcolect`)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
});

export const PostAddBagColect = createAsyncThunk("post", async (data, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:3004/addbagcolect", data)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
})

const AddBagColectSlice = createSlice({
    name: "addbagcolect",
    initialState: {
        loading: false,
        error: '',
        addbagcolect: [],
    },
    extraReducers: {
        [GetAddBagColect.pending]: state => {
            state.loading = true
        },
        [GetAddBagColect.fulfilled]: (state, action) => {
            state.loading = false
            state.addbagcolect = action.payload
        },
        [GetAddBagColect.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }, reducers: {
        clearAddBagColect: (state) => {
            state.addbagcolect = [];
        },
    }
})
export const { clearAddBagColect } = AddBagColectSlice.actions;
export default AddBagColectSlice.reducer;