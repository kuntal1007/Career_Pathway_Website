import auth from './auth';
import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { DashboardAPI } from '../services/dashboard';
import { UserAPI } from '../services/user';
import { CompanyAPI } from '../services/company';
import { ReviewAPI } from '../services/review';
import { PaymentAPI } from '../services/payment';

const rootReducer = combineReducers({
	auth,
	[authApi.reducerPath]: authApi.reducer,
	[DashboardAPI.reducerPath]: DashboardAPI.reducer,
	[UserAPI.reducerPath]: UserAPI.reducer,
	[CompanyAPI.reducerPath]: CompanyAPI.reducer,
	[ReviewAPI.reducerPath]: ReviewAPI.reducer,
	[PaymentAPI.reducerPath]: PaymentAPI.reducer,
});

export default rootReducer;
