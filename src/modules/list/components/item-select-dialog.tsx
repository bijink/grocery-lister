import { ListPlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { items } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

import { useGroceryListStore } from '../stores/grocery-list.store';

export default function ItemSelectDialog({ listId }: { listId: number }) {
  const groceryLists = useGroceryListStore((state) => state.lists);
  const addItemToList = useGroceryListStore((state) => state.addItemToList);

  const selectedListIndex = groceryLists.findIndex((list) => list?.id === listId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="list-item-add-button" className="w-24" variant="outline">
          <ListPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-scroll font-[family-name:var(--font-geist-mono)] sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Select item</DialogTitle>
          <DialogDescription className="sr-only">Select an item</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const isAdded = groceryLists[selectedListIndex].items.some((i) => i.name === item.name);
            return (
              <div
                key={item.id}
                className={cn('rounded-md bg-gray-100 px-2 py-2', {
                  'text-gray-300': isAdded,
                })}
                onClick={addItemToList.bind(null, listId, item)}
                role="button"
              >
                <p className="text-lg">{item.name}</p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
