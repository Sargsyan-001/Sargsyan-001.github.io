import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetCharms = createAsyncThunk("charms", async (_, thunkAPI) => {
  try {
    const resp = await axios.get(`http://localhost:3004/charms`)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
});

export const PostCharms = createAsyncThunk("post", async (data, thunkAPI) => {
	try {
		const res = await axios.post("http://localhost:3004/charms", data)
		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue()
	}
})

const CharmsSlice = createSlice({
  name: "charms",
  initialState: {
    loading: false,
    error: '',
    charms: [],
  },
  extraReducers: {
    [GetCharms.pending]: state => {
      state.loading = true
    },
    [GetCharms.fulfilled]: (state, action) => {
      state.loading = false
      state.charms = action.payload
    },
    [GetCharms.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
export default CharmsSlice.reducer;