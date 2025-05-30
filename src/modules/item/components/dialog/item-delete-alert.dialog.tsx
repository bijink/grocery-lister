'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import type { AxiosError } from 'axios';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { axiosInstance } from '@/lib/axios';

import { useItemDialogStore } from '../../stores/item-dialog.store';

export default function ItemDeleteAlertDialog() {
  const queryClient = useQueryClient();

  const isDialogOpen = useItemDialogStore((state) => state.isOpen && state.type === 'delete');
  const itemId = useItemDialogStore((state) => state.item?.id);
  const closeDialog = useItemDialogStore((state) => state.close);

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteItem = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/items/${itemId}`);
      await queryClient.invalidateQueries({ queryKey: ['items'], refetchType: 'all' });
      toast.success('Item has been deleted');
    } catch (_error) {
      const error = _error as AxiosError<{ message: string }>;
      toast.error('Failed to delete', {
        description: error.response?.data?.message || 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete the item.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteItem} className="w-24 px-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
