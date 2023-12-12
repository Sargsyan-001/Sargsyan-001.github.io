import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetGen = createAsyncThunk("gen", async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`http://localhost:3004/gen`)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue()
    }
});

const GenSlice = createSlice({
    name: "gen",
    initialState: {
        loading: false,
        error: '',
        gen: [],
    },
    extraReducers: {
        [GetGen.pending]: state => {
            state.loading = true
        },
        [GetGen.fulfilled]: (state, action) => {
            state.loading = false
            state.gen = action.payload
        },
        [GetGen.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
export default GenSlice.reducer;