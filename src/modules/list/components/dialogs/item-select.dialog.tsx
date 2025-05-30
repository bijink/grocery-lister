import { useQuery } from '@tanstack/react-query';
import { ListPlusIcon } from 'lucide-react';
import Image from 'next/image';

import type { ItemType } from '@/modules/item/components/types/item';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { axiosInstance } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function ItemSelectDialog({
  listId,
  disabled,
}: {
  listId: number;
  disabled?: boolean;
}) {
  const groceryLists = useGroceryListStore((state) => state.lists);
  const addItemToList = useGroceryListStore((state) => state.addItemToList);

  const { data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
  });

  const selectedListIndex = groceryLists.findIndex((list) => list?.id === listId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="list-item-add-button"
          variant="outline"
          className="w-24"
          disabled={disabled}
        >
          <ListPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[70vh] flex-col justify-start overflow-y-scroll font-[family-name:var(--font-geist-mono)] sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Select item(s)</DialogTitle>
          <DialogDescription className="sr-only">Select an item</DialogDescription>
        </DialogHeader>
        <div className="flex h-full flex-col gap-2 overflow-scroll">
          {items?.length ? (
            items.map((item) => {
              const isAdded = groceryLists[selectedListIndex].items.some(
                (i) => i.name === item.name,
              );
              return (
                <div
                  key={item.id}
                  className={cn('cursor-default rounded-md bg-gray-100 px-2 py-2', {
                    'text-gray-300': isAdded,
                  })}
                  onClick={addItemToList.bind(null, listId, item)}
                  role="button"
                >
                  <p className="truncate text-lg">{item.name}</p>
                </div>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <Image
                src="/no-items.svg"
                width={480}
                height={480}
                className="w-36"
                alt="empty-items-image"
                priority
              />
              <div className="text-center">
                <p className="font-bold">No items</p>
                <p className="text-muted-foreground text-sm">Add item(s) first</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
