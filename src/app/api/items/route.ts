import { NextResponse } from 'next/server';

import { db } from '@/lib/supabase/db';

export async function GET() {
  const { data, error } = await db.from('grocery_items').select('*').order('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
