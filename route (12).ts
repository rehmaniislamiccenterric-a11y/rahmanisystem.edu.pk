import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Server-side validation
    const {
      studentName,
      fatherName,
      dob,
      gender,
      fatherContact,
      whatsappNumber,
      email,
      address,
      previousSchool,
      previousClass,
      currentLevel,
      department,
      admissionProgram,
      additionalNotes,
      photoUrl,
    } = data;

    if (!studentName || !fatherName || !dob || !gender || !fatherContact || !whatsappNumber || !address || !department || !admissionProgram) {
      return NextResponse.json(
        { error: 'Missing required admission fields. Please verify all required inputs.' },
        { status: 400 }
      );
    }

    // Generate unique reference number: e.g. ADM-2026-RANDOM
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `ADM-${new Date().getFullYear()}-${randomSuffix}`;

    const newApplication = await prisma.admissionApplication.create({
      data: {
        referenceNumber,
        studentName: studentName.trim(),
        fatherName: fatherName.trim(),
        dob,
        gender,
        photoUrl: photoUrl || null,
        fatherContact: fatherContact.trim(),
        whatsappNumber: whatsappNumber.trim(),
        email: email ? email.trim() : null,
        address: address.trim(),
        previousSchool: previousSchool ? previousSchool.trim() : null,
        previousClass: previousClass ? previousClass.trim() : null,
        currentLevel: currentLevel ? currentLevel.trim() : null,
        department,
        admissionProgram,
        additionalNotes: additionalNotes ? additionalNotes.trim() : null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      referenceNumber: newApplication.referenceNumber,
      applicationId: newApplication.id,
      studentName: newApplication.studentName,
      department: newApplication.department,
      program: newApplication.admissionProgram,
      message: 'Application registered successfully in institutional database',
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process admission application. Please try again.' },
      { status: 500 }
    );
  }
}

// Protected GET route - Only authenticated admin can view submitted applications
export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized access to student admission records' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const department = searchParams.get('department') || '';
  const status = searchParams.get('status') || '';

  const whereClause: any = {};

  if (department && department !== 'ALL') {
    whereClause.department = department;
  }

  if (status && status !== 'ALL') {
    whereClause.status = status;
  }

  if (search) {
    whereClause.OR = [
      { studentName: { contains: search } },
      { fatherName: { contains: search } },
      { referenceNumber: { contains: search } },
      { whatsappNumber: { contains: search } },
      { fatherContact: { contains: search } },
    ];
  }

  const applications = await prisma.admissionApplication.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, count: applications.length, applications });
}
