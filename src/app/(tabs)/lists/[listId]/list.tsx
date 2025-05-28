'use client';

import { ListPlusIcon } from 'lucide-react';

import type { ListType } from '../lists';

import { Button } from '@/components/ui/button';
import { items } from '@/lib/placeholder-data';
import { formatMoment } from '@/lib/utils';
import ListDeleteBtn from '@/modules/list/components/list-delete-btn';

export default function List({ id }: { id: string }) {
  const list: ListType = { id, timestamp: 1748382000000, items: items };

  return (
    <div className="flex flex-col rounded-sm border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-400">{formatMoment(list.timestamp)}</p>
      <div>
        {items.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
        <div className="flex justify-center gap-2">
          <ListDeleteBtn list={list} />
          <Button aria-label="list-item-add-button" className="w-24" variant="outline">
            <ListPlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
