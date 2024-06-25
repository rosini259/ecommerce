import { TLoading } from "@customTypes/shared.types";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
interface IAuthState {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  user: null,
  accessToken: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI:(state)=>{
      state.loading = "idle"
      state.error = null
    },
    authLogout:(state)=>{
      state.user = null
      state.accessToken = null
    }
  },
  extraReducers(builder) {
    //register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    //login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});
export { actAuthRegister, actAuthLogin };
export const {resetUI,authLogout} = authSlice.actions
export default authSlice.reducer;
