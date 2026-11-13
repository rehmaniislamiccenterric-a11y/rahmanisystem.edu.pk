import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.newsAnnouncement.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
