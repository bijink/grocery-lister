'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

import type { ItemType } from '@/modules/item/components/types/item';

import { axiosInstance } from '@/lib/axios';
import ItemAddDrawer from '@/modules/item/components/item-add-drawer';
import ItemDeleteBtn from '@/modules/item/components/item-delete-btn';

export default function ItemsPage() {
  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
  });

  if (isItemsLoading)
    return (
      <div className="flex justify-center pt-5">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-row items-center justify-between border-b border-gray-200 py-2 pr-1 pl-4"
        >
          <p className="text-lg font-semibold">{item.name}</p>
          <ItemDeleteBtn item={item} />
        </div>
      ))}
      <ItemAddDrawer />
    </div>
  );
}
