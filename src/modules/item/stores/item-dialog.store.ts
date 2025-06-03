import { create } from 'zustand';

import type { ItemType } from '../types/item';

type DialogType = 'add' | 'edit' | 'delete' | null;

type StoreType = {
  type: DialogType;
  isOpen: boolean;
  item: ItemType | null;
  openAdd: () => void;
  openEdit: (itemData: ItemType) => void;
  openDelete: (itemData: ItemType) => void;
  close: () => void;
};

export const useItemDialogStore = create<StoreType>((set) => ({
  type: null,
  isOpen: false,
  item: null,
  openAdd: () => set({ type: 'add', isOpen: true, item: null }),
  openEdit: (itemData) => set({ type: 'edit', isOpen: true, item: itemData }),
  openDelete: (itemData) => set({ type: 'delete', isOpen: true, item: itemData }),
  close: () => set({ isOpen: false, type: null, item: null }),
}));
