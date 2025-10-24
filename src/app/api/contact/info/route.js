import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// GET contact info only
export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findFirst({
      where: { isActive: true },
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// PUT - Update contact info
export async function PUT(request) {
  try {
    const body = await request.json();
    const { title, subtitle, email, phone, location, github, linkedin, twitter } = body;

    // Find existing contact info
    const existing = await prisma.contactInfo.findFirst({
      where: { isActive: true },
    });

    let contactInfo;
    if (existing) {
      // Update existing
      contactInfo = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: {
          title: title || existing.title,
          subtitle: subtitle || existing.subtitle,
          email: email || existing.email,
          phone: phone || existing.phone,
          location: location || existing.location,
          github: github || existing.github,
          linkedin: linkedin || existing.linkedin,
          twitter: twitter || existing.twitter,
        },
      });
    } else {
      // Create new
      contactInfo = await prisma.contactInfo.create({
        data: {
          title: title || '',
          subtitle: subtitle || '',
          email: email || '',
          phone: phone || '',
          location: location || '',
          github: github || '',
          linkedin: linkedin || '',
          twitter: twitter || '',
          isActive: true,
        },
      });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
