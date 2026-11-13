import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const application = await prisma.admissionApplication.findUnique({
    where: { id: params.id },
  });

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, application });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status, adminRemarks } = await request.json();

    const updated = await prisma.admissionApplication.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(adminRemarks !== undefined ? { adminRemarks } : {}),
      },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
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
    await prisma.admissionApplication.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
