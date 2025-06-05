import { useQuery } from '@tanstack/react-query';
import { ListPlusIcon, Loader2Icon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import type { ItemType } from '@/modules/item/types/item';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { axiosInstance } from '@/lib/axios';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function ListItemSelectDialog({
  listId,
  disabled,
}: {
  listId: number;
  disabled?: boolean;
}) {
  const groceryLists = useGroceryListStore((state) => state.lists);
  const addItemToList = useGroceryListStore((state) => state.addItemToList);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
  });

  const selectedListIndex = groceryLists.findIndex((list) => list?.id === listId);
  const selectedItems = groceryLists[selectedListIndex]?.items || [];

  // Separate items into unselected and selected
  const [unselectedItems, selectedItemsInList] = items.reduce(
    ([unselected, selected], item) => {
      const isSelected = selectedItems.some((i) => i.name === item.name);
      return isSelected ? [unselected, [...selected, item]] : [[...unselected, item], selected];
    },
    [[], []] as [ItemType[], ItemType[]],
  );

  // Filter both groups based on search term
  const filteredUnselected = unselectedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredSelected = selectedItemsInList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const hasUnselectedResults = filteredUnselected.length > 0;
  const hasSelectedResults = filteredSelected.length > 0;
  const hasAnyResults = hasUnselectedResults || hasSelectedResults;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="list-item-add-button"
          variant="outline"
          className="w-24"
          disabled={disabled || isItemsLoading}
        >
          {isItemsLoading ? <Loader2Icon className="animate-spin" /> : <ListPlusIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex h-[70vh] flex-col justify-start overflow-y-scroll font-[family-name:var(--font-geist-mono)] sm:max-w-[425px]"
      >
        <DialogHeader className="text-left">
          <DialogTitle>Select item(s)</DialogTitle>
          <DialogDescription className="sr-only">Select an item</DialogDescription>
        </DialogHeader>

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

        <div className="flex h-full flex-col gap-2 overflow-scroll">
          {hasAnyResults ? (
            <>
              {/* Unselected items section */}
              {hasUnselectedResults && (
                <>
                  <p className="text-muted-foreground text-sm font-medium">Available items</p>
                  {filteredUnselected.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-default rounded-md bg-gray-100 px-2 py-2 hover:bg-gray-200"
                      onClick={addItemToList.bind(null, listId, item)}
                      role="button"
                    >
                      <p className="truncate text-lg">{item.name}</p>
                    </div>
                  ))}
                </>
              )}

              {/* Selected items section */}
              {hasSelectedResults && (
                <>
                  <p className="text-muted-foreground text-sm font-medium">Already in list</p>
                  {filteredSelected.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-default rounded-md bg-gray-100 px-2 py-2 text-gray-400"
                      role="button"
                    >
                      <p className="truncate text-lg">{item.name}</p>
                    </div>
                  ))}
                </>
              )}
            </>
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
                <p className="font-bold">{searchTerm ? 'No matching items' : 'No items'}</p>
                <p className="text-muted-foreground text-sm">
                  {searchTerm ? 'Try a different search' : 'Add item(s) first'}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
