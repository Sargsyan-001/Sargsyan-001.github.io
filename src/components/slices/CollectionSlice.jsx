import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetColection = createAsyncThunk("colection", async (_, thunkAPI) => {
	try {
		const resp = await axios.get(`http://localhost:3004/colection`)
		return resp.data
	} catch (error) {
		return thunkAPI.rejectWithValue()
	}
});

export const PostColection = createAsyncThunk("post", async (data, thunkAPI) => {
	try {
		const res = await axios.post("http://localhost:3004/colection", data)
		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue()
	}
})

const ColectionSlice = createSlice({
	name: "colection",
	initialState: {
		loading: false,
		error: '',
		colection: [],
	},
	extraReducers: {
		[GetColection.pending]: state => {
			state.loading = true
		},
		[GetColection.fulfilled]: (state, action) => {
			state.loading = false
			state.colection = action.payload
		},
		[GetColection.rejected]: (state, action) => {
			state.loading = false
			state.error = action.payload
		}
	}
})
export default ColectionSlice.reducer;