import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET contact info and methods
export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findFirst({
      where: { isActive: true },
    });

    const contactMethods = await prisma.contactMethod.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({
      contactInfo,
      contactMethods,
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// POST - Submit contact form
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, projectType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject: subject || '',
        message,
        projectType: projectType || '',
      },
    });

    // TODO: Send email notification

    return NextResponse.json(
      { message: 'Message sent successfully', submission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}