import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (featuredOnly) {
      where.featured = true;
    }

    const activities = await prisma.studentActivity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, activities });
  } catch (error) {
    console.error('Activities fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch student activities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      titleEn,
      titleUr,
      category,
      descriptionEn,
      descriptionUr,
      mediaType,
      mediaUrl,
      youtubeUrl,
      activityDate,
      featured,
    } = body;

    if (!titleEn || !titleUr || !category || !mediaUrl) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const activity = await prisma.studentActivity.create({
      data: {
        titleEn,
        titleUr,
        category,
        descriptionEn: descriptionEn || '',
        descriptionUr: descriptionUr || '',
        mediaType: mediaType || 'IMAGE',
        mediaUrl,
        youtubeUrl: youtubeUrl || null,
        activityDate: activityDate || new Date().toISOString().split('T')[0],
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error('Activity creation error:', error);
    return NextResponse.json({ error: 'Failed to create student activity' }, { status: 500 });
  }
}
