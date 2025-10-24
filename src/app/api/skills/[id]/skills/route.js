import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET all skills in a category
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const skills = await prisma.skill.findMany({
      where: { categoryId: parseInt(id) },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill in category
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, level, order } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      );
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        level: level || 50,
        order: order || 0,
        categoryId: parseInt(id),
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
