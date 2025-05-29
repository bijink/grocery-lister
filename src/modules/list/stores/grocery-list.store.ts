import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { ListType } from '../types/list';

interface StoreType {
  lists: ListType[];
  setLists: (lists: ListType[]) => void;
  getList: (listId: number) => ListType | undefined;
  deleteList: (listId: number) => Promise<void>;
  addItemToList: (listId: number, item: { id: string; name: string; quantity?: string }) => void;
  deleteItemFromList: (listId: number, itemId: string) => void;
  updateItemQuantity: (listId: number, itemId: string, quantity: string) => void;
}

export const useGroceryListStore = create<StoreType>()(
  persist(
    immer<StoreType>((set, get) => ({
      lists: [],
      setLists: (lists) => {
        set(() => ({ lists }));
      },
      getList: (listId) => {
        return get().lists.find((l) => l.id === listId);
      },
      deleteList: async (listId) => {
        set((state) => {
          state.lists = state.lists.filter((l) => l.id !== listId);
        });
      },
      addItemToList: (listId, item) => {
        set((state) => {
          const list = state.lists.find((l) => l.id === listId);
          if (!list) return;

          const exists = list.items.some((i) => i.id === item.id);
          if (!exists) {
            list.items.push({ ...item, quantity: item.quantity ?? '' });
          }
        });
      },
      deleteItemFromList: (listId, itemId) => {
        set((state) => {
          const list = state.lists.find((l) => l.id === listId);
          if (!list) return;

          list.items = list.items.filter((item) => item.id !== itemId);
        });
      },
      updateItemQuantity: (listId, itemId, quantity) => {
        set((state) => {
          const list = state.lists.find((l) => l.id === listId);
          if (!list) return;

          const item = list.items.find((i) => i.id === itemId);
          if (item && item.quantity !== quantity) {
            item.quantity = quantity;
          }
        });
      },
    })),
    {
      name: 'grocery-lists', // localStorage key
    },
  ),
);
