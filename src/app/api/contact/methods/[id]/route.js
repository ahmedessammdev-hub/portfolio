import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET single contact method
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const method = await prisma.contactMethod.findUnique({
      where: { id: parseInt(id) },
    });

    if (!method) {
      return NextResponse.json(
        { error: 'Method not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(method);
  } catch (error) {
    console.error('Error fetching method:', error);
    return NextResponse.json(
      { error: 'Failed to fetch method' },
      { status: 500 }
    );
  }
}

// PUT - Update contact method
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { icon, title, description, value, link, order } = body;

    const method = await prisma.contactMethod.update({
      where: { id: parseInt(id) },
      data: {
        ...(icon !== undefined && { icon }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(value && { value }),
        ...(link !== undefined && { link }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(method);
  } catch (error) {
    console.error('Error updating method:', error);
    return NextResponse.json(
      { error: 'Failed to update method' },
      { status: 500 }
    );
  }
}

// DELETE contact method
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.contactMethod.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Method deleted successfully' });
  } catch (error) {
    console.error('Error deleting method:', error);
    return NextResponse.json(
      { error: 'Failed to delete method' },
      { status: 500 }
    );
  }
}
