'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { AxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { axiosInstance } from '@/lib/axios';

import { useItemDialogStore } from '../../stores/item-dialog.store';

export default function ItemAddDrawer() {
  const queryClient = useQueryClient();

  const isDrawerOpen = useItemDialogStore((state) => state.isOpen && state.type === 'add');
  const closeDrawer = useItemDialogStore((state) => state.close);

  const inputRef = useRef<HTMLInputElement>(null);
  const [itemName, setItemName] = useState('');

  const mutation = useMutation({
    mutationFn: (value: { name: string }) => {
      return axiosInstance.post('/api/items', value);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['items'], refetchType: 'all' });
      closeDrawer();
      setItemName('');
      toast.success('New item has been added.');
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error('Failed to add item', {
        description: error.response?.data?.error || 'An unknown error occurred.',
      });
    },
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ name: itemName });
  };

  // Auto-focus input when drawer opens (with delay for animation)
  useEffect(() => {
    if (isDrawerOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={closeDrawer} modal={true}>
      <DrawerContent className="!bottom-0 mt-auto !h-fit overflow-hidden overflow-y-auto rounded-t-2xl px-4 py-6 !pt-0 !pb-12">
        <form onSubmit={handleSave}>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Add item</DrawerTitle>
            <DrawerDescription>Add new item here.</DrawerDescription>
          </DrawerHeader>
          <div className="mt-2 space-y-4">
            <Input
              placeholder="Item name"
              type="text"
              className="border-0 shadow-none !ring-0 !outline-none focus:!ring-0"
              ref={inputRef}
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
              autoFocus
            />
          </div>

          <DrawerFooter className="flex flex-row justify-end px-0 pt-0">
            <Button
              variant="ghost"
              className="w-24 px-2 font-extrabold"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="animate-spin" /> : 'Save'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
