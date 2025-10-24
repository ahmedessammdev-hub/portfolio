import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      include: {
        technologies: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

// POST - Create new experience
export async function POST(request) {
  try {
    const body = await request.json();
    const { position, company, duration, location, description, technologies, order } = body;

    const experience = await prisma.experience.create({
      data: {
        position,
        company,
        duration,
        location,
        description,
        order: order || 0,
        technologies: {
          create: technologies?.map(tech => ({ name: tech })) || [],
        },
      },
      include: {
        technologies: true,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}