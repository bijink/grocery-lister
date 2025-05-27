'use client';

import { useMeasure } from '@uidotdev/usehooks';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnimatedTabsProps {
  children: React.ReactNode;
  tabList: { value: string; label: string }[];
}

export function AnimatedTabs({ children, tabList }: AnimatedTabsProps) {
  const pathname = usePathname();

  const [activeTab, setActiveTab] = React.useState(pathname.split('/')[1]);
  const [ref] = useMeasure();
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const indicatorX = tabRefs.current[activeTab]?.offsetLeft || 0;
  const indicatorWidth = tabRefs.current[activeTab]?.offsetWidth || 0;

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
                <Link href={tab.value}>{tab.label}</Link>
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

      <TabsContent value={activeTab} className="px-0.5">
        {children}
      </TabsContent>
    </Tabs>
  );
}
