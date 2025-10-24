import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET all education entries
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      include: {
        achievements: {
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

// POST - Create new education entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { degree, institution, duration, location, description, gpa, type, order, achievements } = body;

    if (!degree || !institution) {
      return NextResponse.json(
        { error: 'Degree and institution are required' },
        { status: 400 }
      );
    }

    const newEducation = await prisma.education.create({
      data: {
        degree,
        institution,
        duration: duration || '',
        location: location || '',
        description: description || '',
        gpa: gpa || null,
        type: type || 'degree',
        order: order || 0,
        achievements: achievements && achievements.length > 0
          ? {
              create: achievements.map((achievement) => ({
                achievement: achievement,
              })),
            }
          : undefined,
      },
      include: {
        achievements: true,
      },
    });

    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
