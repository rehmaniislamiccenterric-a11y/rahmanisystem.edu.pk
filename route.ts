import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const testimonials = await prisma.parentTestimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const testimonial = await prisma.parentTestimonial.create({
      data: {
        parentNameEn: body.parentNameEn,
        parentNameUr: body.parentNameUr || body.parentNameEn,
        studentRelationEn: body.studentRelationEn,
        studentRelationUr: body.studentRelationUr || body.studentRelationEn,
        quoteEn: body.quoteEn,
        quoteUr: body.quoteUr || body.quoteEn,
        rating: Number(body.rating) || 5,
        isApproved: true,
      },
    });
    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
