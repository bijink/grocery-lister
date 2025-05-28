'use client';

import { useState } from 'react';

import { AnimatedAddBtn } from '@/components/animated-add-btn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useGroceryListsStore } from '@/modules/list/stores/grocery-lists.store';

export default function AddOptionsDropdown() {
  const groceryLists = useGroceryListsStore((state) => state.lists);
  const setGroceryLists = useGroceryListsStore((state) => state.setLists);

  const [open, setOpen] = useState(false);

  const toggleBtn = () => setOpen((prev) => !prev);

  const handleAddList = () => {
    setGroceryLists([...groceryLists, { id: Date.now(), items: [] }]);
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
        <DropdownMenuItem onClick={handleAddList}>Add list</DropdownMenuItem>
        <DropdownMenuItem>Add item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
