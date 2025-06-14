import { NextResponse } from 'next/server';

import { db } from '@/lib/supabase/db';

export async function GET() {
  const { data, error } = await db
    .from('grocery_items')
    .select('*')
    .order('name', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: 'Item name is required' }, { status: 400 });
  }

  // Check if name already exists
  const { data: existingItem, error: fetchError } = await db
    .from('grocery_items')
    .select('name')
    .ilike('name', name)
    .single();

  if (existingItem) {
    return NextResponse.json(
      { error: `Item '${existingItem.name}' already exists` },
      { status: 400 },
    );
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 = No rows found (safe to ignore if checking existence)
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // Insert new item
  const { data, error } = await db
    .from('grocery_items')
    .insert([{ name, quantity: '' }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
