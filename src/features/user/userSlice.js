import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// You can export this thunk function to the desired component file to dispatch it, i.e. CreateOrder.jsx
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // This return will be the payload of the FULFILLED state in the extraReducers below, so e.g. you can then use action.payload.position
    return { position, address };
  }
);

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  // extraReducers handle thunk functions
  extraReducers: (builder) =>
    builder
      // when the thunk function initially gets called, while the async code is running, it makes pending state
      .addCase(fetchAddress.pending, (state, action) => {
        // this is the reducer function
        state.status = "loading";
      })
      // when the thunk function correctly returns some values, it goes to a fulfilled state
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // this is the reducer function
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      // Finally if the thunk function doesnt work, e.g. user denies location access, it goes to a rejected state
      .addCase(fetchAddress.rejected, (state, action) => {
        // this is the reducer function
        state.status = "error";
        state.error = action.error.message; // you can then conditionally render something to show this erro
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

// accesses the user reducer state and returns the username
export const getUsername = (state) => state.user.userName;
