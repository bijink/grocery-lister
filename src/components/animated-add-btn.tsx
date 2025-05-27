'use client';

import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface AnimatedAddBtnProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AnimatedAddBtn({ isOpen, onToggle }: AnimatedAddBtnProps) {
  return (
    <motion.div
      onClick={onToggle}
      // whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-2xl bg-green-200 text-green-900 shadow-lg',
      )}
      aria-label={isOpen ? 'Close' : 'Add'}
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Plus className="h-7 w-7" />
      </motion.div>
    </motion.div>
  );
}
