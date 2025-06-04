'use client';

import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { formatMoment } from '@/lib/utils';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

export default function Lists() {
  const groceryLists = useGroceryListStore((state) => state.lists);

  const [isGroceryListsLoading, setIsGroceryListsLoading] = useState(true);

  useEffect(() => {
    setIsGroceryListsLoading(false);
  }, [groceryLists]);

  if (isGroceryListsLoading)
    return (
      <div className="flex justify-center pt-5">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="flex h-[75vh] flex-col gap-2 overflow-scroll rounded-sm">
      {groceryLists?.length ? (
        [...groceryLists].reverse().map((list) => (
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
                      <p className="grow truncate">{item.name}</p>
                      <div className="flex gap-2">
                        <p>-</p>
                        <p className="w-18 truncate text-right font-light">{item.quantity}</p>
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
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-3">
          <Image
            src="/no-lists.svg"
            width={480}
            height={480}
            className="w-40"
            alt="empty-lists-image"
            priority
          />
          <div className="text-center">
            <p className="font-bold">List is empty</p>
            <p className="text-muted-foreground text-sm">
              Click the + button and select <br /> &apos;Add list&apos; to add a new list.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
