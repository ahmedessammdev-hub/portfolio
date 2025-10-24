import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch single experience
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
      include: {
        technologies: true,
      },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

// PUT - Update experience
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { position, company, duration, location, description, technologies, order, isActive } = body;

    // Delete existing technologies
    await prisma.experienceTechnology.deleteMany({
      where: { experienceId: parseInt(id) },
    });

    // Update experience with new technologies
    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        position,
        company,
        duration,
        location,
        description,
        order,
        isActive,
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
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE - Delete experience
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}