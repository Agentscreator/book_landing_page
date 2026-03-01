import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { nailTechs } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newNailTech = await db.insert(nailTechs).values({
      name,
      email,
      phone: phone || null,
    }).returning();

    return NextResponse.json(
      { success: true, data: newNailTech[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving nail tech interest:', error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save interest' },
      { status: 500 }
    );
  }
}
