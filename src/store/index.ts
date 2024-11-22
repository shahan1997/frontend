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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, void, Action>;

export default store;

//!
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // Assuming you have a rootReducer

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // You can customize options here if needed
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });

// export default store;
