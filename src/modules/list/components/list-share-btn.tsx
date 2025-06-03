'use client';

import { Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

import type { ItemType } from '@/modules/item/types/item';

import { Button } from '@/components/ui/button';

export default function ListShareBtn({
  items,
  disabled,
}: {
  items: ItemType[];
  disabled?: boolean;
}) {
  const handleShare = async () => {
    const formattedText = items.map((item) => `${item.name} - ${item.quantity}`).join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Grocery List',
          text: formattedText,
        });
        toast.success('Shared successfully!');
      } catch (_err) {
        toast.error('Failed to share.');
      }
    } else {
      toast.warning('Sharing not supported on this device.');
      try {
        await navigator.clipboard.writeText(formattedText);
        toast.success('List copied to clipboard!');
      } catch (_err) {
        toast.error('Failed to copy.');
      }
    }
  };

  return (
    <Button
      aria-label="list-share-button"
      size="icon"
      variant="outline"
      onClick={handleShare}
      disabled={!items.length || disabled}
    >
      <Share2Icon />
    </Button>
  );
}
