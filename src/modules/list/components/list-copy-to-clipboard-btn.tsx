'use client';

import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import type { ItemsType } from '@/lib/placeholder-data';

import { Button } from '@/components/ui/button';

export default function ListCopyToClipboardBtn({
  items,
  disabled,
}: {
  items: ItemsType[];
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const formattedText = items.map((item) => `${item.name} - ${item.quantity}`).join('\n');
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      toast.success('List copied to clipboard!');
      setTimeout(() => setCopied(false), 4000); // reset icon after 4 seconds
    } catch (_err) {
      toast.error('Failed to copy.');
    }
  };

  return (
    <Button
      aria-label="list-copy-to-clipboard-button"
      size="icon"
      variant="outline"
      onClick={handleCopy}
      disabled={!items.length || disabled}
    >
      {copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
