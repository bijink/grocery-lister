'use client';

import { ListPlusIcon, Loader, XIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ListType } from '@/modules/list/types/list';

import { Input } from '@/components/ui/input';
import { cn, formatMoment } from '@/lib/utils';
import ItemSelectDialog from '@/modules/list/components/dialogs/item-select.dialog';
import ListDeleteAlertDialog from '@/modules/list/components/dialogs/list-delete-alert.dialog';
import ListCopyToClipboardBtn from '@/modules/list/components/list-copy-to-clipboard-btn';
import ListShareBtn from '@/modules/list/components/list-share-btn';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

type QuantityState = Record<string, string>; // key = item.id

export default function List({ id }: { id: number }) {
  const groceryLists = useGroceryListStore((state) => state.lists);
  const groceryList = useGroceryListStore((state) => state.getList(id) as ListType);
  const updateItemQuantity = useGroceryListStore((state) => state.updateItemQuantity);
  const deleteItem = useGroceryListStore((s) => s.deleteItemFromList);

  // Local state to hold quantity inputs per item
  const [quantities, setQuantities] = useState<QuantityState>({});

  // Initialize local quantities on first load
  useEffect(() => {
    if (groceryList?.items) {
      const initialQuantities: QuantityState = {};
      groceryList.items.forEach((item) => {
        initialQuantities[item.id] = item.quantity as string; // Ensure quantity is a string
      });
      setQuantities(initialQuantities);
    }
  }, [groceryList?.items]);
  // Debounced update to the store
  useEffect(() => {
    const timeout = setTimeout(() => {
      Object.entries(quantities).forEach(([itemId, quantity]) => {
        const storeValue = groceryList?.items.find((i) => i.id === itemId)?.quantity;
        if (storeValue !== quantity) {
          updateItemQuantity(groceryList.id, itemId, quantity);
        }
      });
    }, 1500); // 1500ms debounce

    return () => clearTimeout(timeout);
  }, [quantities, updateItemQuantity, groceryList]);

  // Get loading state for quantity input changes debouncing
  const isItemsQtyUpdating = useMemo(() => {
    return groceryList?.items?.some((item) => quantities[item.id] !== item.quantity);
  }, [quantities, groceryList?.items]);
  // Memoized input handler
  const handleItemQuantityChange = useCallback(
    (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = e.target.value;
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    },
    [],
  );

  if (!groceryLists.length || !groceryList)
    return (
      <div className="flex justify-center pt-5">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col rounded-sm border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-400">{formatMoment(groceryList?.id)}</p>

      {groceryList.items?.length ? (
        <div className="flex flex-col gap-2">
          {groceryList.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2">
              <p className="truncate">{item.name}</p>
              <div className="flex gap-2">
                <p>-</p>
                <Input
                  className="!h-fit w-24 !rounded-none border-0 border-b border-dashed border-gray-400 !p-0 text-right font-light !shadow-none !ring-0 !outline-none focus:border-b focus:!ring-0"
                  value={quantities[item.id] ?? ''}
                  onChange={(e) => handleItemQuantityChange(item.id, e)}
                />
                <XIcon
                  className="text-muted-foreground !h-5 !w-5"
                  onClick={deleteItem.bind(null, groceryList.id, item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-5">
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>Click</span>
            <ListPlusIcon aria-label="list-item-add-button-icon" className="!h-4.5 !w-4.5" />
            <span>to add items</span>
          </p>
        </div>
      )}

      <div
        className={cn('flex justify-between', {
          'pt-1': !groceryList.items?.length,
          'pt-5': groceryList.items?.length,
        })}
      >
        <div className="flex gap-1">
          <ListCopyToClipboardBtn items={groceryList.items} disabled={isItemsQtyUpdating} />
          <ListShareBtn items={groceryList.items} disabled={isItemsQtyUpdating} />
        </div>
        <div className="flex gap-1">
          <ItemSelectDialog listId={groceryList.id} disabled={isItemsQtyUpdating} />
          <ListDeleteAlertDialog listId={groceryList.id} />
        </div>
      </div>
    </div>
  );
}
