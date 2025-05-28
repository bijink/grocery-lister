'use client';

import { Trash2Icon } from 'lucide-react';

import type { ListType } from '@/app/(tabs)/lists/lists';

import { Button } from '@/components/ui/button';

export default function ListDeleteBtn({ list }: { list: ListType }) {
  const handleDeleteList = (_listId: string) => {
    // console.log(listId);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => handleDeleteList(list.id)}
      className="bg-red-200"
    >
      <Trash2Icon />
    </Button>
  );
}
