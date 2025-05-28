import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ListType } from '../types/list';

interface StoreState {
  lists: ListType[];
  setLists: (lists: ListType[]) => void;
}

export const useGroceryListsStore = create(
  persist<StoreState>(
    (set) => ({
      lists: [],
      setLists: (lists) => set({ lists }),
    }),
    {
      name: 'grocery-lists', // localStorage key
    },
  ),
);
