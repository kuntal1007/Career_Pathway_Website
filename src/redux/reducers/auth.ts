import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: null,
	isSignUp: null,
	loading: false,
	user: null,
	company: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading(state: any, action) {
			state.loading = action.payload;
		},
		logout: (state: any) => {
			state.isLogin = null;
			state.loading = false;
			state.user = null;
			state.company = null;
			state.token = null;
		},
		login: (state: any, action) => {
			const { token, user, company } = action.payload;
			state.user = user;
			state.company = company;
			state.token = token;
			state.isLogin = true;
		},
		aspirantsignup: (state: any, action) => {
			const { token, result } = action.payload;
			state.isLogin = true;
			state.user = result;
			state.token = token;
			state.isSignUp = true;
			state.company = null;
		},
		companysignup: (state: any, action) => {
			const { token, result } = action.payload;
			state.isLogin = true;
			state.company = result;
			state.token = token;
			state.user = null;
			state.isSignUp = true;
		},
	},
});

export const { setLoading, logout, login, aspirantsignup, companysignup } = authSlice.actions;
export default authSlice.reducer;
