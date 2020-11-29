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
    editing: false,
    editError: null,
  },
  reducers: {
    fetch(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.locations = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    create(state) {
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
    delete(state) {
      state.deleting = true;
      state.deleteError = null;
    },
    deleteSuccess(state, action) {
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
    edit(state) {
      state.editing = true;
      state.editError = null;
    },
    editSuccess(state, action) {
      state.editing = false;
      state.editError = null;
      state.locations = state.locations.map((info) => {
        if (info?.id === action?.payload?.data?.id) {
          info = action?.payload?.data;
        }
        return info;
      });
    },
    editError(state, action) {
      state.editing = false;
      state.editError = action.payload.error;
    },
  },
});

export const { name, actions, reducer } = locationSlice;
