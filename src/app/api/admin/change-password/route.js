import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    // Verify admin is authenticated
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get admin from database
    const adminUser = await prisma.admin.findUnique({
      where: { id: admin.id },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, adminUser.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
