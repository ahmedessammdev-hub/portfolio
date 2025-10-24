import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch hero data
export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      where: { isActive: true },
    });

    if (!hero) {
      return NextResponse.json({ error: 'Hero data not found' }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return NextResponse.json({ error: 'Failed to fetch hero data' }, { status: 500 });
  }
}

// PUT - Update hero data
export async function PUT(request) {
  try {
    const body = await request.json();
    const { name, bio, linkedIn, github, cvLink, heroImg } = body;

    // Get existing hero or create new one
    const existingHero = await prisma.hero.findFirst({
      where: { isActive: true },
    });

    let hero;
    if (existingHero) {
      hero = await prisma.hero.update({
        where: { id: existingHero.id },
        data: {
          name,
          bio,
          linkedIn,
          github,
          cvLink,
          heroImg,
        },
      });
    } else {
      hero = await prisma.hero.create({
        data: {
          name,
          bio,
          linkedIn,
          github,
          cvLink,
          heroImg,
        },
      });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error updating hero data:', error);
    return NextResponse.json({ error: 'Failed to update hero data' }, { status: 500 });
  }
}