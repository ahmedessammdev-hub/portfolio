import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch about data
export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      where: { isActive: true },
    });

    if (!about) {
      return NextResponse.json({ error: 'About data not found' }, { status: 404 });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

// PUT - Update about data
export async function PUT(request) {
  try {
    const body = await request.json();
    const { title, bio, description, profileImg, contactLink, resumeLink, ctaText, resumeText } = body;

    // Get existing about or create new one
    const existingAbout = await prisma.about.findFirst({
      where: { isActive: true },
    });

    let about;
    if (existingAbout) {
      about = await prisma.about.update({
        where: { id: existingAbout.id },
        data: {
          title,
          bio,
          description,
          profileImg,
          contactLink,
          resumeLink,
          ctaText,
          resumeText,
        },
      });
    } else {
      about = await prisma.about.create({
        data: {
          title,
          bio,
          description,
          profileImg,
          contactLink,
          resumeLink,
          ctaText,
          resumeText,
        },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}