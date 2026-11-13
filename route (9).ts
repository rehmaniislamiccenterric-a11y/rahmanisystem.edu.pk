import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const mediaType = searchParams.get('mediaType');

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (mediaType && mediaType !== 'ALL') {
      where.mediaType = mediaType;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titleEn, titleUr, category, mediaType, mediaUrl, youtubeUrl, captionEn, captionUr } = body;

    if (!titleEn || !category || !mediaUrl) {
      return NextResponse.json({ error: 'Title, category, and media URL are required' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        titleEn,
        titleUr: titleUr || titleEn,
        category,
        mediaType: mediaType || 'PHOTO',
        mediaUrl,
        youtubeUrl: youtubeUrl || null,
        captionEn: captionEn || null,
        captionUr: captionUr || null,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Gallery item creation error:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
