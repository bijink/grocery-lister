'use client';

import Link from 'next/link';

import { items, type ItemsType } from '@/lib/placeholder-data';
import { formatMoment } from '@/lib/utils';

export interface ListType {
  id: string;
  timestamp: number;
  items: ItemsType[];
}

export default function Lists() {
  const lists: ListType[] = [
    { id: 'list1', timestamp: 1748382000000, items: items },
    { id: 'list2', timestamp: 1748295600000, items: items },
    { id: 'list3', timestamp: 1748209200000, items: items },
    { id: 'list4', timestamp: 1748122800000, items: items },
    { id: 'list5', timestamp: 1748036400000, items: items },
    { id: 'list6', timestamp: 1747950000000, items: items },
    { id: 'list7', timestamp: 1747863600000, items: items },
    { id: 'list8', timestamp: 1744969423000, items: items },
  ];

  return (
    <div className="flex flex-col gap-2">
      {lists.map((list) => (
        <Link
          key={list.id}
          href={`/lists/${list.id}`}
          className="flex flex-col rounded-sm border-2 border-gray-200 bg-gray-50 px-3 py-2"
        >
          <p className="text-xs text-gray-400">{formatMoment(list.timestamp)}</p>
          <div>
            {items.slice(0, 3).map((item) => (
              <p key={item.id}>{item.name}</p>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
