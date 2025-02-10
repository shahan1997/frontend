/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import createReducer from "./rootReducer";
import { posApi } from "../page/posApi";

//import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const initializeStore = {
  reducer: createReducer(),
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => [
    ...getDefaultMiddleware(),
    posApi.middleware,
  ],
};

export const store = configureStore(initializeStore);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, Action>;

export default store;
