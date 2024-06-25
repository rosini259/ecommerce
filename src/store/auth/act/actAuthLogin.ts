import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
  email: string;
  password: string;
};
type TResponse={
    accessToken:string
    user:{
        firstName:string
        lastName:string
        email:string
        id:number
    }
}
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkApi) => {
    const {rejectWithValue}=thunkApi
    try {
        const response = await axios.post<TResponse>("/login",formData)
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
  }
);
export default actAuthLogin;
