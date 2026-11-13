import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { isActive: true };
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const announcements = await prisma.newsAnnouncement.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { publishedAt: 'desc' }],
    });

    return NextResponse.json({ success: true, announcements });
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch news announcements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titleEn, titleUr, summaryEn, summaryUr, contentEn, contentUr, category, priority } = body;

    if (!titleEn || !summaryEn) {
      return NextResponse.json({ error: 'Title and summary are required' }, { status: 400 });
    }

    const item = await prisma.newsAnnouncement.create({
      data: {
        titleEn,
        titleUr: titleUr || titleEn,
        summaryEn,
        summaryUr: summaryUr || summaryEn,
        contentEn: contentEn || null,
        contentUr: contentUr || null,
        category: category || 'NOTICE',
        priority: priority || 'NORMAL',
        publishedAt: new Date(),
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('News creation error:', error);
    return NextResponse.json({ error: 'Failed to publish announcement' }, { status: 500 });
  }
}
