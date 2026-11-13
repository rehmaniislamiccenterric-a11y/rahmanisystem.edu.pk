import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Name, phone, and message are required' }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email: email || null,
        phone,
        subject: subject || 'General Inquiry',
        message,
      },
    });

    return NextResponse.json({ success: true, inquiryId: inquiry.id, message: 'Inquiry received' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, inquiries });
}
