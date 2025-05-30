'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AnimatedAddBtn } from '@/components/animated-add-btn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useItemDialogStore } from '@/modules/item/stores/item-dialog.store';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function AddOptionsDropdown() {
  const router = useRouter();
  const groceryLists = useGroceryListStore((state) => state.lists);
  const setGroceryLists = useGroceryListStore((state) => state.setLists);
  const openDrawer = useItemDialogStore((state) => state.openAdd);

  const [open, setOpen] = useState(false);

  const toggleBtn = () => setOpen((prev) => !prev);

  const handleAddList = () => {
    const timestamp = Date.now();
    setGroceryLists([...groceryLists, { id: timestamp, items: [] }]);
    router.push(`/lists/${timestamp}`);
  };
  const handleAddItem = () => {
    router.push('/items');
    openDrawer();
  };

  return (
    <DropdownMenu open={open} onOpenChange={toggleBtn}>
      <DropdownMenuTrigger className="!outline-none">
        <AnimatedAddBtn isOpen={open} onToggle={toggleBtn} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        align="end"
        className={cn(
          '-mr-4.5 flex flex-col-reverse gap-1 border-0 bg-transparent shadow-none',
          'add-option-menu-item-styles',
        )}
      >
        <DropdownMenuItem
          className="bg-gray-600 text-gray-200 focus:bg-gray-600 focus:text-gray-200"
          onClick={handleAddList}
        >
          Add list
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-gray-800 text-gray-200 focus:bg-gray-800 focus:text-gray-200"
          onClick={handleAddItem}
        >
          Add item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
