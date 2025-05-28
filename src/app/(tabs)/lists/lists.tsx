'use client';

import Link from 'next/link';

import { formatMoment } from '@/lib/utils';
import { useGroceryListsStore } from '@/modules/list/stores/grocery-lists.store';

export default function Lists() {
  const groceryLists = useGroceryListsStore((state) => state.lists);

  return (
    <div className="flex flex-col gap-2">
      {groceryLists?.length
        ? groceryLists.map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="flex flex-col rounded-sm border-2 border-gray-200 bg-gray-50 px-3 py-2"
            >
              <p className="text-xs text-gray-400">{formatMoment(list.id)}</p>
              <div>
                {list.items?.length ? (
                  list.items.slice(0, 3).map((item) => <p key={item.id}>{item.name}</p>)
                ) : (
                  <div className="flex justify-center py-5">
                    <p className="text-sm text-gray-600">Click here to add items.</p>
                  </div>
                )}
              </div>
            </Link>
          ))
        : null}
    </div>
  );
}
