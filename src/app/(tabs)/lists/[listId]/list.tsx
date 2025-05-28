'use client';

import { ListPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { ListType } from '@/modules/list/types/list';

import { Button } from '@/components/ui/button';
import { formatMoment } from '@/lib/utils';
import ListDeleteBtn from '@/modules/list/components/list-delete-btn';
import { useGroceryListsStore } from '@/modules/list/stores/grocery-lists.store';

export default function List({ id }: { id: number }) {
  const groceryLists = useGroceryListsStore((state) => state.lists);

  const [groceryList, setGroceryList] = useState({} as ListType);

  useEffect(() => {
    const list = groceryLists.find((list) => list.id === id);
    setGroceryList(list as ListType);
  }, [groceryLists, id]);

  return (
    <div className="flex flex-col rounded-sm border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-400">{formatMoment(groceryList?.id)}</p>
      <div>
        {groceryList?.items?.length ? (
          groceryList.items.map((item) => <p key={item.id}>{item.name}</p>)
        ) : (
          <div className="flex justify-center py-5">
            <p className="text-sm text-gray-600">Add items here...</p>
          </div>
        )}
        <div className="flex justify-center gap-2">
          <ListDeleteBtn list={groceryList} />
          <Button aria-label="list-item-add-button" className="w-24" variant="outline">
            <ListPlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
