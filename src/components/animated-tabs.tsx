'use client';

import { useMeasure } from '@uidotdev/usehooks';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGroceryListStore } from '@/modules/list/stores/grocery-list.store';

interface AnimatedTabsProps {
  children: ReactNode;
  tabList: { value: string; label: string }[];
}

export function AnimatedTabs({ children, tabList }: AnimatedTabsProps) {
  const pathname = usePathname();
  const rootPath = pathname.split('/')[1];
  const groceryLists = useGroceryListStore((state) => state.lists);

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [isGroceryListsLoading, setIsGroceryListsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(rootPath);
  const [ref] = useMeasure();

  const indicatorX = tabRefs.current[activeTab]?.offsetLeft || 0;
  const indicatorWidth = tabRefs.current[activeTab]?.offsetWidth || 0;

  useEffect(() => {
    setIsGroceryListsLoading(false);
  }, [groceryLists]);
  useEffect(() => {
    // Update active tab when pathname changes
    if (rootPath !== activeTab) {
      setActiveTab(rootPath);
    }
  }, [rootPath, activeTab]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" ref={ref}>
      <div className="border-border relative border-b">
        <TabsList className="relative flex w-full bg-transparent">
          <div className="flex w-full justify-between gap-4">
            {tabList.map((tab) => (
              <TabsTrigger
                asChild
                key={tab.value}
                value={tab.value}
                ref={(el) => {
                  tabRefs.current[tab.value] = el;
                }}
                className="text-muted-foreground data-[state=active]:text-primary relative border-none bg-transparent px-4 py-2 font-medium !shadow-none !ring-0 !outline-none focus:ring-0"
              >
                <Link href={`/${tab.value}`}>
                  {tab.label}
                  {tab.value === 'lists' ? (
                    <p>({isGroceryListsLoading ? '-' : groceryLists.length})</p>
                  ) : null}
                </Link>
              </TabsTrigger>
            ))}
          </div>

          {/* Animated bottom line */}
          <motion.div
            className="bg-primary absolute bottom-0 left-0 h-[2px]"
            animate={{ x: indicatorX, width: indicatorWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </TabsList>
      </div>

      <TabsContent value={activeTab}>{children}</TabsContent>
    </Tabs>
  );
}
