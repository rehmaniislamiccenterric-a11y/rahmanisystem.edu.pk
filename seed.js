const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Rahmani Islamic Center & Wa Education System...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('AdminPassword2026!', salt);

  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: {
      username: 'admin',
      name: 'System Administrator',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Admin user initialized: admin / AdminPassword2026!');

  // 2. Institutional Settings
  await prisma.institutionalSetting.upsert({
    where: { id: 'settings-default' },
    update: {
      institutionNameEn: 'Rahmani Islamic Center & Wa Raast Education System',
      institutionNameUr: 'رحمانی اسلامک سنٹر اینڈ وا راست ایجوکیشن سسٹم',
      phone: '+92 300 4122318 / 0300 4136938',
      whatsapp: '+92 300 4122318',
    },
    create: {
      id: 'settings-default',
      institutionNameEn: 'Rahmani Islamic Center & Wa Raast Education System',
      institutionNameUr: 'رحمانی اسلامک سنٹر اینڈ وا راست ایجوکیشن سسٹم',
      phone: '+92 300 4122318 / 0300 4136938',
      whatsapp: '+92 300 4122318',
      email: 'admissions@rahmanisystem.edu.pk',
      addressEn: 'Model Town, J Block, Lahore, Pakistan',
      addressUr: 'ماڈل ٹاؤن، جے بلاک، لاہور، پاکستان',
      googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13611.85422899478!2d74.3128!3d31.4826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919041b3a16d55d%3A0xb3e648c0a2a4b87!2sModel%20Town%2C%20Lahore!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
      statHifzGraduates: 240,
      statAcademicStudents: 410,
      statQualifiedFaculty: 32,
      statEstablishedYear: 2014,
      aboutVisionEn: 'Quranic Education with Modern Academic Excellence. Providing an integrated learning pathway from Hifz-ul-Quran to cutting-edge science and mathematics.',
      aboutVisionUr: 'قرآنی تعلیم اور جدید تعلیمی کمال کا حسین امتزاج۔ حفظ القرآن سے لے کر جدید سائنس و ریاضیات تک جامع تعلیمی سفر۔',
    },
  });

  // 3. Student Activities
  const activities = [
    {
      titleEn: 'Annual Hifz Completion & Dastaar Bandi Ceremony',
      titleUr: 'سالانہ تکمیلِ حفظ القرآن و دستار بندی کی پروقار تقریب',
      category: 'Quran Completion Ceremonies',
      descriptionEn: 'Honoring 24 young Huffaz-e-Quran who completed the memorization of the Holy Quran with Tajweed rules and character excellence.',
      descriptionUr: '24 کم عمر حفاظِ کرام کے اعزاز میں تقریب جنہوں نے حسنِ قرأت و تجوید کے ساتھ حفظِ کلامِ پاک مکمل کیا۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-10-15',
      featured: true,
    },
    {
      titleEn: 'Wa Education STEM & Science Discovery Fair',
      titleUr: 'وا ایجوکیشن سسٹم کی سالانہ سائنس و پریکٹیکل نمائش',
      category: 'Science Experiments',
      descriptionEn: 'Hifz graduate students conducting chemistry, physics, and robotics experiments showcasing seamless academic transition.',
      descriptionUr: 'حفاظ طلباء کی جانب سے کیمسٹری، فزکس اور روبوٹکس کے سائنسی تجربات کا شاندار عملی مظاہرہ۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-09-20',
      featured: true,
    },
    {
      titleEn: 'Daily Tajweed & Makharij Interactive Circles',
      titleUr: 'روزانہ تجوید و مخارج کے عملی حلقہ جات',
      category: 'Quran Recitation',
      descriptionEn: 'Small group personalized guidance ensuring accurate pronunciation, melodic recitation, and vocal discipline.',
      descriptionUr: 'چھوٹے گروپس میں طلباء کے مخارج اور ترتیل کی انفرادی اصلاح اور رہنمائی۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-11-02',
      featured: true,
    },
    {
      titleEn: 'Mental Math and Speed Calculation Olympiad',
      titleUr: 'ذہنی ریاضی اور حساب دانی کا مقابلہ',
      category: 'Mathematics Activities',
      descriptionEn: 'Applying Quran-trained memorization speed and discipline to master advanced algebraic concepts and logic puzzles.',
      descriptionUr: 'حفظ کے دوران حاصل شدہ یادداشت کی صلاحیتوں کو جدید ریاضی اور الجبرا کے حل میں استعمال کرنا۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-10-28',
      featured: false,
    },
    {
      titleEn: 'Physical Fitness & Sunnah Sports Gala',
      titleUr: 'جسمانی نشوونما اور سنوی اسپورٹس گالا',
      category: 'Sports',
      descriptionEn: 'Archery, athletics, football, and team building exercises promoting health, discipline, and brotherhood.',
      descriptionUr: 'تیر اندازی، دوڑ، فٹ بال اور باہمی تعاون کی سرگرمیاں جو جسمانی چستی اور بھائی چارے کو فروغ دیتی ہیں۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-10-05',
      featured: false,
    },
    {
      titleEn: 'Islamic Ethics & Character Building Seminar',
      titleUr: 'اخلاقِ حسنہ اور کردار سازی کی خصوصی نشست',
      category: 'Hifz Activities',
      descriptionEn: 'Weekly focus on Seerah, filial respect, truthfulness, and community leadership for holistic student development.',
      descriptionUr: 'سیرت النبی ﷺ کی روشنی میں والدین کے احترام، سچائی اور قائدانہ صلاحیتوں کی عملی تربیت۔',
      mediaType: 'IMAGE',
      mediaUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
      activityDate: '2026-11-08',
      featured: true,
    },
  ];

  for (const act of activities) {
    await prisma.studentActivity.create({ data: act });
  }

  // 4. Gallery Items
  const gallery = [
    {
      titleEn: 'Quran Memorization Hall & Reading Sessions',
      titleUr: 'حفظ ہال اور تلاوتِ قرآن کی خوبصورت نشستیں',
      category: 'RAHMANI_ISLAMIC',
      mediaType: 'PHOTO',
      mediaUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
      captionEn: 'Students engaged in deep focus during morning memorization hours.',
      captionUr: 'طلباء صبح کے پرسکون اوقات میں تلاوت و حفظ میں مصروف۔',
    },
    {
      titleEn: 'Modern Science Laboratory at Wa Education',
      titleUr: 'وا ایجوکیشن سسٹم کی جدید سائنسی تجربہ گاہ',
      category: 'WA_EDUCATION',
      mediaType: 'PHOTO',
      mediaUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80',
      captionEn: 'Fully equipped physics and chemistry lab stations for hands-on learning.',
      captionUr: 'فزکس اور کیمسٹری کے عملی تجربات کے لیے جدید ساز و سامان۔',
    },
    {
      titleEn: 'Smart Classroom & English Language Workshop',
      titleUr: 'سمارٹ کلاس روم اور انگریزی زبان کی تدریس',
      category: 'WA_EDUCATION',
      mediaType: 'PHOTO',
      mediaUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      captionEn: 'Multimedia interactive smart boards for grammar and creative writing.',
      captionUr: 'انٹرایکٹو سمارٹ بورڈ کے ذریعے جدید تدریسی طریقے اور تخلیقی تحریر۔',
    },
    {
      titleEn: 'Tajweed Mastery Recitation Showcase',
      titleUr: 'حسنِ تجوید و ترتیل کا مظاہرہ',
      category: 'RAHMANI_ISLAMIC',
      mediaType: 'YOUTUBE',
      mediaUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      captionEn: 'Student recitation demonstrating adherence to Ahkam al-Tajweed.',
      captionUr: 'طالب علم کی جانب سے قواعدِ تجوید کے مطابق تلاوت کا نمونہ۔',
    },
    {
      titleEn: 'Annual Awards & Sanad Distribution Event',
      titleUr: 'سالانہ تقسیمِ اسناد و اعزازات کی تقریب',
      category: 'CEREMONIES',
      mediaType: 'PHOTO',
      mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      captionEn: 'Parents and dignitaries celebrating the academic and Quranic milestones.',
      captionUr: 'والدین اور معزز مہمانانِ گرامی کی موجودگی میں طلباء کی حوصلہ افزائی۔',
    },
    {
      titleEn: 'Model Town Campus Courtyard & Library',
      titleUr: 'ماڈل ٹاؤن کیمپس کا خوبصورت منظر و کتب خانہ',
      category: 'CAMPUS',
      mediaType: 'PHOTO',
      mediaUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      captionEn: 'Peaceful, disciplined, and nurturing environment for holistic education.',
      captionUr: 'تعلیم و تربیت کے لیے پرسکون، پروقار اور خوبصورت ماحول۔',
    },
  ];

  for (const item of gallery) {
    await prisma.galleryItem.create({ data: item });
  }

  // 5. News & Announcements
  const news = [
    {
      titleEn: 'Admissions Open for Session 2026-2027: Hifz & Academic Bridge',
      titleUr: 'داخلے جاری ہیں تعلیمی سال 2026-2027: حفظ القرآن اور جدید تعلیمی سلسلہ',
      summaryEn: 'Online registration is now open for Nazra Quran, Hifz-ul-Quran at Rahmani Islamic Center, and Science & Academic classes at Wa Education System.',
      summaryUr: 'رحمانی اسلامک سنٹر اور وا ایجوکیشن سسٹم میں ناظرہ، حفظ القرآن اور جدید سائنس و اکیڈمک کلاسز کے لیے آن لائن داخلے شروع ہو چکے ہیں۔',
      contentEn: 'We are pleased to invite parents to register their children for the upcoming academic session. Our dual-stream model allows children to achieve Quranic mastery followed by accelerated, high-standard science, mathematics, and English academic qualifications.',
      contentUr: 'ہم والدین کو نئے تعلیمی سیشن کے لیے بچوں کے داخلے کی دعوت دیتے ہیں۔ ہمارا جامع نظام بچوں کو حفظِ قرآن کے ساتھ ساتھ اعلیٰ ترین سائنسی اور تعلیمی میدان میں آگے بڑھنے کے بھرپور مواقع فراہم کرتا ہے۔',
      category: 'ADMISSION',
      priority: 'URGENT',
      publishedAt: new Date(),
      isActive: true,
    },
    {
      titleEn: 'Distinction in Lahore Inter-School Quran & Science Symposium',
      titleUr: 'لاہور انٹر اسکول حسنِ قرأت اور سائنسی مقابلے میں نمایاں کامیابی',
      summaryEn: 'Students of Rahmani Islamic Center and Wa Education System secured 1st position in Qirat and 2nd position in Junior Physics Model competition.',
      summaryUr: 'ہمارے طلباء نے حسنِ قرأت میں پہلی اور جونیئر فزکس ماڈل سازی میں دوسری پوزیشن حاصل کر کے ادارے کا نام روشن کیا۔',
      category: 'ACHIEVEMENT',
      priority: 'HIGH',
      publishedAt: new Date(Date.now() - 3 * 86400000),
      isActive: true,
    },
    {
      titleEn: 'Parent-Teacher Orientation and Progress Assessment Day',
      titleUr: 'والدین اور اساتذہ کی تربیتی و تعلیمی جائزہ نشست',
      summaryEn: 'Quarterly review meeting to discuss student character development, Hifz retention (Daur), and modern science coursework progress.',
      summaryUr: 'طلباء کی اخلاقی تربیت، حفظ کے دور اور جدید سائنسی مضامین کی سہ ماہی پیش رفت پر تفصیلی گفتگو۔',
      category: 'NOTICE',
      priority: 'NORMAL',
      publishedAt: new Date(Date.now() - 7 * 86400000),
      isActive: true,
    },
  ];

  for (const n of news) {
    await prisma.newsAnnouncement.create({ data: n });
  }

  // 6. Parent Testimonials
  const testimonials = [
    {
      parentNameEn: 'Engr. Muhammad Tariq Khan',
      parentNameUr: 'انجینئر محمد طارق خان',
      studentRelationEn: 'Father of Abdullah Tariq (Hafiz & Wa Education Student)',
      studentRelationUr: 'والد عبداللہ طارق (حافظِ قرآن و طالب علم وا ایجوکیشن)',
      quoteEn: 'My son completed his Hifz-ul-Quran in just 2.5 years with excellent Tajweed. Now in Wa Education System, his transition into Mathematics and Science has been phenomenal. He is topping his class!',
      quoteUr: 'میرے بیٹے نے محض ڈھائی سال میں بہترین تجوید کے ساتھ حفظ مکمل کیا۔ اب وا ایجوکیشن سسٹم میں اس کی سائنس اور ریاضی میں ترقی حیرت انگیز ہے۔ وہ کلاس میں اول پوزیشن حاصل کر رہا ہے۔',
      rating: 5,
      isApproved: true,
    },
    {
      parentNameEn: 'Dr. Shahida Parveen',
      parentNameUr: 'ڈاکٹر شاہدہ پروین',
      studentRelationEn: 'Mother of Zaid & Hamza (Model Town, Lahore)',
      studentRelationUr: 'والدہ زید و حمزہ (ماڈل ٹاؤن، لاہور)',
      quoteEn: 'Finding an institution in Lahore that balances authentic Quranic memorization with rigorous English and Science without compromise was a blessing. The teachers are deeply caring and dedicated.',
      quoteUr: 'لاہور میں ایسا ادارہ تلاش کرنا جو حقیقی قرآنی تربیت اور معیاری انگریزی و سائنس دونوں کو بہترین انداز میں یکجا کرے، ہمارے لیے نعمت ثابت ہوا۔ اساتذہ انتہائی شفیق اور باصلاحیت ہیں۔',
      rating: 5,
      isApproved: true,
    },
    {
      parentNameEn: 'Chaudhry Naveed Ahmad',
      parentNameUr: 'چوہدری نوید احمد',
      studentRelationEn: 'Father of Muhammad Usama (Class 7 Academic Stream)',
      studentRelationUr: 'والد محمد اسامہ (طالب علم ہفتم جماعت اکیڈمک)',
      quoteEn: 'The discipline and ethical manners inculcated at Rahmani Islamic Center reflect in every aspect of my child’s conduct. His analytical skills in Science at Wa Education System are top-notch.',
      quoteUr: 'رحمانی اسلامک سنٹر سے سیکھے ہوئے اخلاق اور تمیز میرے بچے کے ہر عمل میں جھلکتے ہیں۔ اس کے ساتھ وا ایجوکیشن سسٹم میں سائنسی سمجھ بوجھ قابلِ ستائش ہے۔',
      rating: 5,
      isApproved: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.parentTestimonial.create({ data: t });
  }

  // 7. Initial Admission Applications
  const applications = [
    {
      referenceNumber: 'ADM-2026-1001',
      studentName: 'Muhammad Huzaifa',
      fatherName: 'Abdul Rehman',
      dob: '2016-04-12',
      gender: 'Male',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      fatherContact: '+92 301 2345678',
      whatsappNumber: '+92 301 2345678',
      email: 'huzaifa.parent@gmail.com',
      address: 'House 45, C Block, Model Town, Lahore',
      previousSchool: 'The Educators Model Town',
      previousClass: 'Class 3',
      currentLevel: 'Nazra Completed',
      department: 'RAHMANI_ISLAMIC',
      admissionProgram: 'Hifz-ul-Quran (Full-time Memorization)',
      additionalNotes: 'Student has keen interest in memorizing the Quran and has already completed 2 paras.',
      status: 'APPROVED',
      adminRemarks: 'Interview completed. Excellent memory and Tajweed foundation.',
    },
    {
      referenceNumber: 'ADM-2026-1002',
      studentName: 'Ahmad Raza',
      fatherName: 'Kamran Raza',
      dob: '2014-08-25',
      gender: 'Male',
      photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      fatherContact: '+92 321 9876543',
      whatsappNumber: '+92 321 9876543',
      email: 'kamran.raza@outlook.com',
      address: 'House 12-B, J Block, Model Town, Lahore',
      previousSchool: 'Rahmani Islamic Center',
      previousClass: 'Hifz Completion Sanad',
      currentLevel: 'Hafiz-ul-Quran',
      department: 'WA_EDUCATION',
      admissionProgram: 'Accelerated Academic Bridge (Science & Mathematics)',
      additionalNotes: 'Completed Hifz last month. Seeking admission in academic stream to prepare for 8th and Matric.',
      status: 'PENDING',
      adminRemarks: 'Pending document verification for academic bridge admission.',
    },
    {
      referenceNumber: 'ADM-2026-1003',
      studentName: 'Bilal Hassan',
      fatherName: 'Hassan Mehmood',
      dob: '2018-02-19',
      gender: 'Male',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      fatherContact: '+92 333 4455667',
      whatsappNumber: '+92 333 4455667',
      email: 'hassan.m@gmail.com',
      address: 'Faisal Town, Lahore',
      previousSchool: 'Home Schooling',
      previousClass: 'Prep',
      currentLevel: 'Beginner',
      department: 'RAHMANI_ISLAMIC',
      admissionProgram: 'Nazra Quran with Basic Tajweed & Islamic Etiquette',
      additionalNotes: 'Requesting morning batch.',
      status: 'PENDING',
      adminRemarks: null,
    },
  ];

  for (const app of applications) {
    await prisma.admissionApplication.upsert({
      where: { referenceNumber: app.referenceNumber },
      update: {},
      create: app,
    });
  }

  console.log('Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
