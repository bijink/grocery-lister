'use client';

import { useMeasure } from '@uidotdev/usehooks';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnimatedTabsProps {
  children: React.ReactNode;
  tabList: { value: string; label: string }[];
  isListsLoading: boolean;
  isItemsLoading: boolean;
  listsLength: number;
  itemsLength: number;
}

export function AnimatedTabs({
  children,
  tabList,
  isListsLoading,
  isItemsLoading,
  listsLength,
  itemsLength,
}: AnimatedTabsProps) {
  const pathname = usePathname();
  const rootPath = pathname.split('/')[1];

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ref] = useMeasure();

  const [activeTab, setActiveTab] = useState(rootPath);

  const indicatorX = tabRefs.current[activeTab]?.offsetLeft || 0;
  const indicatorWidth = tabRefs.current[activeTab]?.offsetWidth || 0;

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
                <Link href={`/${tab.value}`} replace>
                  {tab.label}
                  {tab.value === 'lists' ? (
                    <p>({isListsLoading ? '-' : listsLength})</p>
                  ) : (
                    <p>({isItemsLoading ? '-' : itemsLength})</p>
                  )}
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
