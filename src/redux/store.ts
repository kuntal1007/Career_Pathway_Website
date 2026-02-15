import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { authApi } from "./services/auth";
import { DashboardAPI } from "./services/dashboard";
import { UserAPI } from "./services/user";
import { ReviewAPI } from "./services/review";
import { CompanyAPI } from "./services/company";
import { PaymentAPI } from "./services/payment";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(thunk)
      .concat(authApi.middleware)
      .concat(DashboardAPI.middleware)
      .concat(UserAPI.middleware)
      .concat(CompanyAPI.middleware)
      .concat(ReviewAPI.middleware)
      .concat(PaymentAPI.middleware)
});

export default store;
