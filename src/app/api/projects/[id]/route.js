import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch single project
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        technologies: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, image, liveLink, githubLink, featured, technologies, order, isActive } = body;

    // Delete existing technologies
    await prisma.projectTechnology.deleteMany({
      where: { projectId: parseInt(id) },
    });

    // Update project with new technologies
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
        liveLink,
        githubLink,
        featured,
        order,
        isActive,
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
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}