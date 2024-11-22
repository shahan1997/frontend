import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { POSStores } from '../core/types/commonType';
export type EnumLiteralsOf<T extends object> = T[keyof T];

export type POSStores = EnumLiteralsOf<typeof POSStores>;

export const POSStores = Object.freeze({
  DEFAULT: "DEFAULT" as const,
  PRODUCT: "PRODUCT" as const,
  CATEGORY: "CATEGORY" as const,
  USERMANAGE: "USERMANAGE" as const,
});

export interface POSItem {
  component: POSStores;
  data: Object;
}

const initialState: POSItem = {
  component: POSStores.DEFAULT,
  data: {},
};

export const posStore = createSlice({
  name: "posStore",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<POSItem>) => {
      state.component = action.payload.component;
      state.data = action.payload.data;
    },
    restore: (state) => {
      state.component = POSStores.DEFAULT;
      state.data = {};
    },
  },
});

export const { addItem, restore } = posStore.actions;

export const POSReducer = posStore.reducer;

export { initialState as POSInitialState };
