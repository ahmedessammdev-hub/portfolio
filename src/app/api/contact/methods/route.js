import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET all contact methods
export async function GET() {
  try {
    const methods = await prisma.contactMethod.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(methods);
  } catch (error) {
    console.error('Error fetching contact methods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact methods' },
      { status: 500 }
    );
  }
}

// POST - Create new contact method
export async function POST(request) {
  try {
    const body = await request.json();
    const { icon, title, description, value, link, order } = body;

    if (!title || !value) {
      return NextResponse.json(
        { error: 'Title and value are required' },
        { status: 400 }
      );
    }

    const method = await prisma.contactMethod.create({
      data: {
        icon: icon || null,
        title,
        description: description || null,
        value,
        link: link || null,
        order: order || 0,
      },
    });

    return NextResponse.json(method, { status: 201 });
  } catch (error) {
    console.error('Error creating contact method:', error);
    return NextResponse.json(
      { error: 'Failed to create contact method' },
      { status: 500 }
    );
  }
}
