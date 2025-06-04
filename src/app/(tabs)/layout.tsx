import AddOptionsDropdown from './add-options-dropdown';
import Tabs from './tabs';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-[family-name:var(--font-geist-mono)]">
      <main className="flex flex-col">
        <div>
          <h1 className="my-5 text-center text-3xl font-bold">Grocery Lister</h1>
        </div>
        <div className="px-2">
          <Tabs>{children}</Tabs>
        </div>
        <div className="fixed right-5 bottom-5 z-50">
          <AddOptionsDropdown />
        </div>
      </main>
    </div>
  );
}
