'use client';

import { Trash2Icon } from 'lucide-react';

import type { ItemsType } from '@/lib/placeholder-data';

import { Button } from '@/components/ui/button';

export default function ItemDeleteBtn({ item }: { item: ItemsType }) {
  const handleDeleteItem = (_itemId: string) => {
    // console.log(itemId);
  };

  return (
    <Button size="icon" variant="ghost" onClick={() => handleDeleteItem(item.id)}>
      <Trash2Icon className="!h-4.5 !w-4.5" />
    </Button>
  );
}
