import type { ItemType } from '@/modules/item/types/item';

export interface ListType {
  id: number; // timestamp
  items: ItemType[];
}
