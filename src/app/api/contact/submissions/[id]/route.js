import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET single submission
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const submission = await prisma.contactSubmission.findUnique({
      where: { id: parseInt(id) },
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

// PUT - Update submission (mark as read)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isRead } = body;

    const submission = await prisma.contactSubmission.update({
      where: { id: parseInt(id) },
      data: {
        isRead: isRead !== undefined ? isRead : true,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

// DELETE submission
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.contactSubmission.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
