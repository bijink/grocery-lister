'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
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
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { axiosInstance } from '@/lib/axios';

export default function ItemAddDrawer() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const mutation = useMutation({
    mutationFn: (value: { name: string }) => {
      return axiosInstance.post('/api/item', value);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['items'], refetchType: 'all' });
      setOpen(false);
      setItemName('');
      toast.success('New item has been added');
    },
    onError: (err) => {
      const error = err as AxiosError<{ error: string }>;
      toast.error('Failed to add item', {
        description: error.response?.data?.error || 'An unknown error occurred',
      });
    },
  });

  const handleSave = () => {
    mutation.mutate({ name: itemName });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={true}>
      <DrawerTrigger asChild>
        <Button className="block md:hidden">Open Drawer</Button>
      </DrawerTrigger>

      <DrawerContent className="!bottom-0 mt-auto !h-fit overflow-hidden overflow-y-auto rounded-t-2xl px-4 py-6 !pt-0 !pb-12">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Add item</DrawerTitle>
          <DrawerDescription>Add new item here.</DrawerDescription>
        </DrawerHeader>

        <div className="mt-2 space-y-4">
          <Input
            placeholder="Item name"
            type="text"
            className="border-0 shadow-none !ring-0 !outline-none focus:!ring-0"
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            autoFocus
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
