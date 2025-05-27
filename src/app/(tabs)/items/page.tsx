import { items } from '@/lib/placeholder-data';
import ItemAddDrawer from '@/modules/items/components/item-add-drawer';
import ItemDeleteBtn from '@/modules/items/components/item-delete-btn';

export default function ItemsPage() {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-row items-center justify-between border-b border-gray-200 py-2 pr-1 pl-4"
        >
          <p className="text-lg font-semibold">{item.name}</p>
          <ItemDeleteBtn item={item} />
        </div>
      ))}
      <ItemAddDrawer />
    </div>
  );
}
