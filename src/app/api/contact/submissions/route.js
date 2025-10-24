import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET all contact submissions
export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
