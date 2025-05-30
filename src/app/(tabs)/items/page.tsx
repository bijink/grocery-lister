import ItemAddDrawer from '@/modules/item/components/dialog/item-add-drawer';
import ItemDeleteAlertDialog from '@/modules/item/components/dialog/item-delete-alert.dialog';
import ItemEditDrawer from '@/modules/item/components/dialog/item-edit-drawer';

import Items from './items';

export default function ItemsPage() {
  return (
    <>
      <Items />
      <ItemAddDrawer />
      <ItemEditDrawer />
      <ItemDeleteAlertDialog />
    </>
  );
}
