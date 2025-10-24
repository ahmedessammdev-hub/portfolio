import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET single education entry
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const education = await prisma.education.findUnique({
      where: { id: parseInt(id) },
      include: {
        achievements: true,
      },
    });

    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

// PUT - Update education entry
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { degree, institution, duration, location, description, gpa, type, order, achievements } = body;

    console.log('Updating education ID:', id);
    console.log('Received data:', body);
    console.log('Achievements:', achievements);

    // Delete existing achievements
    await prisma.educationAchievement.deleteMany({
      where: { educationId: parseInt(id) },
    });

    const updatedEducation = await prisma.education.update({
      where: { id: parseInt(id) },
      data: {
        ...(degree && { degree }),
        ...(institution && { institution }),
        ...(duration !== undefined && { duration }),
        ...(location !== undefined && { location }),
        ...(description !== undefined && { description }),
        ...(gpa !== undefined && { gpa }),
        ...(type && { type }),
        ...(order !== undefined && { order }),
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

    return NextResponse.json(updatedEducation);
  } catch (error) {
    console.error('Error updating education:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to update education', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE education entry
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Delete all achievements first
    await prisma.educationAchievement.deleteMany({
      where: { educationId: parseInt(id) },
    });

    // Delete the education entry
    await prisma.education.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
