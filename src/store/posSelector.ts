import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';
import { POSItem } from './posSlice';

export const selectPosStore = (state: RootState) => state.posStore;

export const selectItems = createSelector(
  selectPosStore,
  (postStore) => postStore as POSItem
);
