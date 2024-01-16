import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserLoginRequest, UserUpdateRequest } from "./interface";
import authService from "./authService";

export interface AuthState {
  user: UserData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const user = JSON.parse(localStorage.getItem("user") as string);

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserData, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (error:any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLoginRequest, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error:any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateUserAsync = async (updatedUserData: UserUpdateRequest): Promise<UserData> => {
  try {
    
    const response = await authService.updateUser(updatedUserData);
    return response; 
  } catch (error) {
    throw error; 
  }
};

export const updateUser = createAsyncThunk('auth/updateUser', async (updatedUserData: UserUpdateRequest, thunkApi) => {
  try {
    const user = await updateUserAsync(updatedUserData);
    
    return user;
  } catch (error:any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "An error has occured";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "An error has occured";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "An error has occured";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
