import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    locations: [],
    error: null,
    creating: false,
    createError: null,
    deleting: false,
    deleteError: null,
  },
  reducers: {
    fetch(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      console.log(action);
      state.locations = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    fetchError(state, action) {
      console.log("action", action);
      state.loading = false;
      state.error = action.payload.error;
    },
    create(state, action) {
      state.creating = true;
      state.createError = null;
    },
    createSuccess(state, action) {
      state.creating = false;
      state.createError = null;
      state.locations = [...state.locations, action.payload.data];
    },
    createError(state, action) {
      state.creating = false;
      state.createError = action.payload.error;
    },
    delete(state, action) {
      state.deleting = true;
      state.deleteError = null;
    },
    deleteSuccess(state, action) {
      console.log("action", action);
      state.deleting = false;
      state.deleteError = null;
      state.locations = state.locations.filter(
        (l) => l.id !== action?.payload?.data?.id
      );
    },
    deleteError(state, action) {
      state.deleting = false;
      state.deleteError = action.payload.error;
    },
  },
});

export const { name, actions, reducer } = locationSlice;
