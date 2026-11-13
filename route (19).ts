import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await prisma.studentActivity.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ success: true, activity: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.studentActivity.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Activity deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}
