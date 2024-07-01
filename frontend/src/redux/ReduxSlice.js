import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    userEmail: localStorage.getItem("userEmail") ? localStorage.getItem("userEmail") : "",
    userTOKEN: localStorage.getItem("instaTOKEN") ? localStorage.getItem("instaTOKEN") : "",
    appliedJobs: localStorage.getItem("appliedJobs") ? JSON.parse(localStorage.getItem("appliedJobs")) : [],
  },
  reducers: {
    UserLoggedIn(state, action) {
      state.userEmail = action.payload.userEmail;
      state.userTOKEN = action.payload.token ? action.payload.token : state.token;
      state.appliedJobs = action.payload.appliedJob;
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("userTOKEN", state.userTOKEN);
      localStorage.setItem("appliedJobs", JSON.stringify(state.appliedJobs));
    },
    userAppliedJob(state, action) {
      state.appliedJobs = [...state.appliedJobs, action.payload];
      localStorage.setItem("appliedJobs", JSON.stringify(state.appliedJobs));
    }, 
    UserLogOut(state, action) {
      state.userEmail = "";
      state.userTOKEN = "";
      state.appliedJobs = "";
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userTOKEN");
      localStorage.removeItem("appliedJobs");
    },

  },
});
export const {
  UserLoggedIn,
  userAppliedJob,
  UserLogOut
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
