import type { ItemType } from '@/modules/item/components/types/item';

export interface ListType {
  id: number; // timestamp
  items: ItemType[];
}
