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
        findItem.count = temItem.count; // Update the count or apply any other logic
        findItem.totalPrice = temItem.totalPrice; // Update the total price based on the updated count
        findItem.selectedIngredients = temItem.selectedIngredients;
      } else {
        state.items.push(temItem);
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

export const { addItem, removeItem, removeBasket } = basket.actions;

export const BasketReducer = basket.reducer;

export { initialState as BasketInitialState };
