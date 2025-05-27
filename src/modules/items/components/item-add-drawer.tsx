'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

export default function ItemAddDrawer() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when drawer opens (with delay for animation)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSave = () => {
    // handle save logic here
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={true}>
      <DrawerTrigger asChild>
        <Button className="block md:hidden">Open Drawer</Button>
      </DrawerTrigger>

      <DrawerContent className="!bottom-0 mt-auto !h-fit overflow-y-auto rounded-t-2xl px-4 py-6 !pt-0 !pb-12">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Add item</DrawerTitle>
        </DrawerHeader>

        <div className="mt-2 space-y-4">
          <Input
            ref={inputRef}
            placeholder="Item name"
            type="text"
            className="border-0 shadow-none !ring-0 !outline-none focus:!ring-0"
          />
        </div>

        <DrawerFooter className="flex flex-row justify-end px-0 pt-0">
          <Button onClick={handleSave} variant="ghost" className="font-extrabold">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
