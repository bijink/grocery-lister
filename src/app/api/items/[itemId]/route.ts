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

export async function PUT(req: Request, { params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const body = await req.json();
  const { name } = body;

  if (!itemId) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ error: 'Item name must be provided' }, { status: 400 });
  }

  // Check for duplicate name (if name is being updated)
  if (name) {
    const { data: existing, error: existingError } = await db
      .from('grocery_items')
      .select('id')
      .eq('name', name)
      .neq('id', itemId)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json({ error: existingError.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: 'Duplicate item name not allowed' }, { status: 400 });
    }
  }

  const { data, error } = await db
    .from('grocery_items')
    .update({ name })
    .eq('id', itemId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
