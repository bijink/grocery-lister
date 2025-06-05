'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader, PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import type { ItemType } from '@/modules/item/types/item';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { axiosInstance } from '@/lib/axios';
import { useItemDialogStore } from '@/modules/item/stores/item-dialog.store';

export default function Items() {
  const pathname = usePathname();
  const rootPath = pathname.split('/')[1];
  const openItemDeleteDialog = useItemDialogStore((state) => state.openDelete);
  const openItemEditDrawer = useItemDialogStore((state) => state.openEdit);

  const [searchTerm, setSearchTerm] = useState('');

  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
    refetchInterval: rootPath === 'items' ? 10 * 1000 : false,
    staleTime: 10 * 1000,
  });

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isItemsLoading)
    return (
      <div className="flex justify-center pt-5">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Search items..."
          className="pr-[4.5rem] pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform !px-0"
            onClick={() => setSearchTerm('')}
          >
            clear
          </Button>
        ) : null}
      </div>
      <div className="flex h-[63vh] flex-col overflow-scroll">
        {filteredItems?.length ? (
          filteredItems.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-center justify-between py-1 pr-1 pl-4">
                <p className="grow truncate text-lg" title={item.name}>
                  {item.name}
                </p>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openItemEditDrawer(item)}>
                    <PencilIcon className="!h-4.5 !w-4.5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => openItemDeleteDialog(item)}>
                    <Trash2Icon className="!h-4.5 !w-4.5" />
                  </Button>
                </div>
              </div>
              {index !== items.length - 1 ? <Separator /> : null}
            </div>
          ))
        ) : (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
            <Image
              src="/no-items.svg"
              width={480}
              height={480}
              className="w-40"
              alt="empty-items-image"
              priority
            />
            <div className="text-center">
              <p className="font-bold">{searchTerm ? 'No matching items' : 'No items'}</p>
              {searchTerm ? (
                <p className="text-muted-foreground text-sm">Try a different search</p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Click the + button and select <br /> &apos;Add item&apos; to add a new item.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
