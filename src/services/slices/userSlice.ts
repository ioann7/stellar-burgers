import { TUser } from '@utils-types';
import { RequestStatus, USER_SLICE } from '../../utils/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

const handleAuthResponse = (response: TAuthResponse): TUser => {
  setCookie('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response.user;
};

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE}/registerUser`,
  async (data) => await registerUserApi(data).then(handleAuthResponse)
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  `${USER_SLICE}/loginUser`,
  async (data) => await loginUserApi(data).then(handleAuthResponse)
);

export const logoutUser = createAsyncThunk<void, void>(
  `${USER_SLICE}/logoutUser`,
  async () =>
    await logoutApi().then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    })
);

export const getUser = createAsyncThunk<TUser, void>(
  `${USER_SLICE}/getUser`,
  async () => await getUserApi().then((response) => response.user)
);

export const updateUser = createAsyncThunk<TUser, TRegisterData>(
  `${USER_SLICE}/updateUser`,
  async (user) => await updateUserApi(user).then((response) => response.user)
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  status: RequestStatus;
  errorMessage: string;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  status: RequestStatus.idle,
  errorMessage: ''
};

export const userSlice = createSlice({
  name: USER_SLICE,
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state: TUserState) => state.user,
    getAuthCheckedSelector: (state: TUserState) => state.isAuthChecked,
    getUserStatusSelector: (state: TUserState) => state.status,
    getUserErrorSelector: (state: TUserState) => state.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.loading;
        state.errorMessage = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.errorMessage = action.error.message || '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.user = action.payload;
        state.errorMessage = '';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.loading;
        state.errorMessage = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.errorMessage = action.error.message || '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.user = action.payload;
        state.errorMessage = '';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = RequestStatus.loading;
        state.errorMessage = '';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.status = RequestStatus.loading;
        state.errorMessage = '';
      })
      .addCase(getUser.rejected, (state) => {
        state.status = RequestStatus.failed;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.loading;
        state.errorMessage = '';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = RequestStatus.failed;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = RequestStatus.success;
        state.user = action.payload;
      });
  }
});

export const userReducer = userSlice.reducer;
export const {
  getUserSelector,
  getAuthCheckedSelector,
  getUserStatusSelector,
  getUserErrorSelector
} = userSlice.selectors;
