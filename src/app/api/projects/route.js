import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      include: {
        technologies: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, image, liveLink, githubLink, featured, technologies, order } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        liveLink,
        githubLink,
        featured: featured || false,
        order: order || 0,
        technologies: {
          create: technologies?.map(tech => ({ name: tech })) || [],
        },
      },
      include: {
        technologies: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}