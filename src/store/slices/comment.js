import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as constant from "../../constant";

export const name = "comments";

export const getAllComments = createAsyncThunk(
  `${name}/getAllComments`,
  async () => {
    try {
      const { data } = await axios.get(`${constant.COMMENTS_API}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  comments: [],
  loading: null,
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    addComment: (state, action) => {
      let newComment = {
        id: Math.random(),
        name: action.payload.name,
        body: action.payload.body,
      };
      state.comments.push(newComment);
    },
  },
  extraReducers: {
    [getAllComments.pending]: (state) => {
      state.loading = constant.HTTP_STATUS.PENDING;
    },
    [getAllComments.fulfilled]: (state, { payload }) => {
      state.loading = constant.HTTP_STATUS.FULFILLED;
      state.comments = payload;
    },
    [getAllComments.rejected]: (state) => {
      state.loading = constant.HTTP_STATUS.REJECTED;
    },
  },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
