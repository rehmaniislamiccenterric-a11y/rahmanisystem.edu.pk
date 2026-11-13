import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'rahmani-wa-education-secret-key-2026-super-secure';

export interface AdminSession {
  id: string;
  username: string;
  name: string;
  role: string;
}

export function signToken(payload: AdminSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch (err) {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;

  const session = verifyToken(token);
  if (!session) return null;

  // Verify in database that admin still exists
  const admin = await prisma.adminUser.findUnique({
    where: { id: session.id },
    select: { id: true, username: true, name: true, role: true },
  });

  return admin;
}
