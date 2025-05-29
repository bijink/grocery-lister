'use client';

import Link from 'next/link';

import { formatMoment } from '@/lib/utils';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function Lists() {
  const groceryLists = useGroceryListStore((state) => state.lists);

  return (
    <div className="flex flex-col gap-2">
      {groceryLists?.length
        ? [...groceryLists].reverse().map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="flex flex-col rounded-sm border-2 border-gray-200 bg-gray-50 px-3 py-2"
            >
              <p className="text-xs text-gray-400">{formatMoment(list.id)}</p>
              <div>
                {list.items?.length ? (
                  <div
                    style={
                      list.items.length > 3
                        ? {
                            maskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
                            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 50%)',
                          }
                        : undefined
                    }
                  >
                    {list.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between gap-2">
                        <p className="truncate">{item.name}</p>
                        <div className="flex gap-2">
                          <p>-</p>
                          <p className="w-18 text-right font-light">{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center py-5">
                    <p className="text-sm text-gray-600">Click me...</p>
                  </div>
                )}
              </div>
            </Link>
          ))
        : null}
    </div>
  );
}
