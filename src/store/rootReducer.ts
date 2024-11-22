/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "@reduxjs/toolkit";
import { posApi } from "../page/posApi";

export const ROOT_ACTIONS = {
  logout: "logout",
};

// Define the Reducers that will always be present in the application
const staticReducers = {
  [posApi.reducerPath]: posApi.reducer,
  // auth: AuthReducer,
  // basket: BasketReducer,
  // posStore: POSReducer,
  // purchaseBasket: PurchaseBasketReducer,
};

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
  let combinedReducer;
  if (asyncReducers) {
    combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  } else {
    // Else just combine the static reducers
    combinedReducer = combineReducers({
      ...staticReducers,
    });
  }

  /**
   * Reset the redux store when user logged out
   */
  if (action.type === ROOT_ACTIONS.logout) {
    state = undefined;
  }

  return combinedReducer
    ? combinedReducer(state, action as never)
    : { ...state };
};

createReducer();

export default createReducer;
