import { NextResponse } from 'next/server';

import { db } from '@/lib/supabase/db';

export async function DELETE(_req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;

  if (!itemId) {
    return NextResponse.json({ error: 'Item ID is required.' }, { status: 400 });
  }

  // 1. Get the item's name first
  const { data: item, error: fetchError } = await db
    .from('grocery_items')
    .select('name')
    .eq('id', itemId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!item) {
    return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
  }

  // 2. Delete the item
  const { error: deleteError } = await db.from('grocery_items').delete().eq('id', itemId);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // 3. Respond with the deleted item's name
  return NextResponse.json({ message: `Item "${item.name}" deleted successfully.` });
}
