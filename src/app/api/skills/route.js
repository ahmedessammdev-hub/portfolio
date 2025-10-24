import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET all skill categories with their skills
export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill category
export async function POST(request) {
  try {
    const body = await request.json();
    const { category, icon, order } = body;

    if (!category) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const newCategory = await prisma.skillCategory.create({
      data: {
        category,
        icon: icon || null,
        order: order || 0,
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating skill category:', error);
    return NextResponse.json(
      { error: 'Failed to create skill category' },
      { status: 500 }
    );
  }
}
