'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader, PencilIcon, Trash2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import type { ItemType } from '@/modules/item/components/types/item';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { axiosInstance } from '@/lib/axios';
import ItemAddDrawer from '@/modules/item/components/dialog/item-add-drawer';
import ItemDeleteAlertDialog from '@/modules/item/components/dialog/item-delete-alert.dialog';
import ItemEditDrawer from '@/modules/item/components/dialog/item-edit-drawer';
import { useItemDialogStore } from '@/modules/item/stores/item-dialog.store';

export default function ItemsPage() {
  const pathname = usePathname();
  const rootPath = pathname.split('/')[1];
  const openItemDeleteDialog = useItemDialogStore((state) => state.openDelete);
  const openItemEditDrawer = useItemDialogStore((state) => state.openEdit);

  const { data: items = [], isLoading: isItemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => axiosInstance.get('/api/items').then((res) => res.data as ItemType[]),
    refetchInterval: rootPath === 'items' ? 10 * 1000 : false,
  });

  if (isItemsLoading)
    return (
      <div className="flex justify-center pt-5">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex h-[70vh] flex-col overflow-scroll">
      {items.map((item, index) => (
        <div key={item.id}>
          <div className="flex flex-row items-center justify-between py-1 pr-1 pl-4">
            <p className="text-lg">{item.name}</p>
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
      ))}
      <ItemAddDrawer />
      <ItemEditDrawer />
      <ItemDeleteAlertDialog />
    </div>
  );
}
