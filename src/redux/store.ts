import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCongfig = {
  key: "auth",
  storage,
};
const persistAuthReducer = persistReducer(persistCongfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER]
      }
    }).concat(baseApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store)