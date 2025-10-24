import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyAdminToken(request) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAuth(handler) {
  return async (request, context) => {
    const admin = verifyAdminToken(request);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Add admin info to request
    request.admin = admin;
    return handler(request, context);
  };
}