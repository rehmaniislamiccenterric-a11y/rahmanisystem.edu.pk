import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await prisma.institutionalSetting.findFirst({
      where: { id: 'settings-default' },
    });
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const updated = await prisma.institutionalSetting.upsert({
      where: { id: 'settings-default' },
      update: {
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        addressEn: body.addressEn,
        addressUr: body.addressUr,
        statHifzGraduates: Number(body.statHifzGraduates) || 0,
        statAcademicStudents: Number(body.statAcademicStudents) || 0,
        statQualifiedFaculty: Number(body.statQualifiedFaculty) || 0,
        statEstablishedYear: Number(body.statEstablishedYear) || 2014,
        aboutVisionEn: body.aboutVisionEn,
        aboutVisionUr: body.aboutVisionUr,
      },
      create: {
        id: 'settings-default',
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        addressEn: body.addressEn,
        addressUr: body.addressUr,
        statHifzGraduates: Number(body.statHifzGraduates) || 0,
        statAcademicStudents: Number(body.statAcademicStudents) || 0,
        statQualifiedFaculty: Number(body.statQualifiedFaculty) || 0,
        statEstablishedYear: Number(body.statEstablishedYear) || 2014,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
