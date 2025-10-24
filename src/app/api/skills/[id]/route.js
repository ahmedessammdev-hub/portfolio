import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET single skill category
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.skillCategory.findUnique({
      where: { id: parseInt(id) },
      include: {
        skills: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update skill category
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { category, icon, order } = body;

    const updatedCategory = await prisma.skillCategory.update({
      where: { id: parseInt(id) },
      data: {
        ...(category && { category }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order }),
      },
      include: {
        skills: true,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE skill category
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Delete all skills in this category first
    await prisma.skill.deleteMany({
      where: { categoryId: parseInt(id) },
    });

    // Delete the category
    await prisma.skillCategory.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
