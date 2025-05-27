import { AnimatedTabs } from './animated-tabs';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="font-[family-name:var(--font-geist-mono)]">
        <main className="flex flex-col">
          <div>
            <h1 className="my-5 text-center text-3xl font-bold">Grocery Lister</h1>
          </div>
          <AnimatedTabs>{children}</AnimatedTabs>
        </main>
      </div>
    </div>
  );
}
