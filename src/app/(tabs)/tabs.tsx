'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { ItemType } from '@/modules/item/types/item';

import { AnimatedTabs } from '@/components/animated-tabs';
import { axiosInstance } from '@/lib/axios';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function Tabs({ children }: { children: React.ReactNode }) {
  const tabList = [
    { value: 'lists', label: 'Lists' },
    { value: 'items', label: 'Items' },
  ];

  const lists = useGroceryListStore((state) => state.lists);

  const [isListsLoading, setIsListsLoading] = useState(true);

  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    setIsListsLoading(false);
  }, [lists]);

  return (
    <AnimatedTabs
      tabList={tabList}
      isListsLoading={isListsLoading}
      isItemsLoading={isItemsLoading}
      listsLength={lists.length}
      itemsLength={items.length}
    >
      {children}
    </AnimatedTabs>
  );
}
