import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET single skill
export async function GET(request, { params }) {
  try {
    const { id, skillId } = await params;
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(skillId) },
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

// PUT - Update skill
export async function PUT(request, { params }) {
  try {
    const { skillId } = await params;
    const body = await request.json();
    const { name, level, order } = body;

    const updatedSkill = await prisma.skill.update({
      where: { id: parseInt(skillId) },
      data: {
        ...(name && { name }),
        ...(level !== undefined && { level }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE skill
export async function DELETE(request, { params }) {
  try {
    const { skillId } = await params;

    await prisma.skill.delete({
      where: { id: parseInt(skillId) },
    });

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
