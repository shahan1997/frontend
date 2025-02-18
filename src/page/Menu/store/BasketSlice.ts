import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient, IPizza } from "../../../core/interface/api.interface";

export interface BasketItem extends IPizza {
  selectedIngredients: IIngredient[];
  count: number;
  totalPrice: number;
}

export interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

export const basket = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      let temItem = { ...action.payload };
      const findItem = state.items.find(
        (element) => element._id === temItem._id
      );
      if (findItem) {
        findItem.count = temItem.count;
        findItem.totalPrice = temItem.totalPrice;
        findItem.selectedIngredients = temItem.selectedIngredients;
      } else {
        state.items.push(temItem);
      }
    },
    updateItemCount: (
      state,
      action: PayloadAction<{ id: string; count: number; totalPrice: number }>
    ) => {
      const { id, count, totalPrice } = action.payload;
      const findItem = state.items.find((item) => item._id === id);

      if (findItem && count > 0) {
        findItem.count = count;
        findItem.totalPrice = totalPrice;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItemIndex = state.items.findIndex(
        (element) => element._id === action.payload
      );
      if (findItemIndex > -1) {
        state = { ...state, items: state.items.splice(findItemIndex, 1) };
      }
    },
    removeBasket: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const { addItem, removeItem, removeBasket, updateItemCount } =
  basket.actions;

export const BasketReducer = basket.reducer;

export { initialState as BasketInitialState };
