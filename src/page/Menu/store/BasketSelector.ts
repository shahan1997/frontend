import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BasketItem, BasketState } from "./BasketSlice";

export const selectBasket = (state: RootState) => state.basket as BasketState;

export const selectBasketItems = createSelector(
  selectBasket,
  (basket) => basket.items as BasketItem[]
);
