# 🏛️ Rahmani Islamic Center & Wa Raast Education System

**Location:** Model Town, J Block, Lahore, Pakistan  
**Founder:** Hafiz Abdul Waheed Shahid Rupdi (حافظ عبدالوحید شاہد روپڑی حفظہ اللہ)  
**Institutional Vision:** *"Building a Generation with Quranic Values & Modern Knowledge"*  
**Urdu Vision:** *"قرآنی تعلیم اور جدید علوم کے ذریعے روشن مستقبل کی تعمیر"*  
**Official Contacts:** Phone 1: `+92 300 4122318` | Phone 2: `0300 4136938` | WhatsApp: `+92 300 4122318`

---

## 📖 1. Project Overview

A complete, modern, full-stack bilingual (English + Urdu Nastaliq) educational institution web application designed for **Rahmani Islamic Center & Wa Raast Education System**.

The institution bridges sacred Quranic memorization with contemporary academic schooling across two connected departments:

1. **Rahmani Islamic Center (Department A):**
   - Nazra Quran with certified Ahkam-ul-Tajweed
   - Hifz-ul-Quran (Full-time memorization with systematic Sabaq, Sabqi, and Daur)
   - Advanced Tajweed & Melodic Qirat
   - Basic Islamic Education (Taharah, Salah, Masnoon Duas, Fiqh)
   - Islamic Manners (*Adab*) & Seerah character building

2. **Wa Raast Education System (Department B):**
   - Accelerated Academic Bridge for Hifz-ul-Quran graduates
   - Hands-on Science Education (Physics, Chemistry, Biology laboratories)
   - Conceptual Mathematics & Logic
   - English Language & Bilingual Urdu Literature
   - Smart Classrooms & Practical Discovery Fairs

---

## 🛠️ 2. Technologies Used

- **Framework:** Next.js 14 (App Router, Server Actions, Dynamic API Routes)
- **Language:** TypeScript & React 18
- **Styling:** Tailwind CSS with custom Islamic architecture palette (Navy `#0E1726`, Subtle Gold `#C5A059`, Academic Blue `#0284C7`, and Ivory `#FDFAF4`)
- **Typography:** Bilingual Google Fonts (`Noto Nastaliq Urdu`, `Amiri`, `Outfit`, and `Inter`) with automatic RTL/LTR layout transitions and `localStorage` persistence
- **Database & ORM:** SQLite with Prisma ORM (Fully local, zero cloud-lockin, 1-line toggle to PostgreSQL / Supabase for cloud deployment)
- **Authentication:** JWT session tokens with secure HTTP-only cookies and bcryptjs password hashing
- **Icons & Visuals:** Lucide React icons, Canvas-Confetti celebration engine, responsive image lightboxes

---

## ⚙️ 3. How to Install Dependencies

### Prerequisites:
- **Node.js:** v18.17+ or v20+ or v22+
- **Git:** Installed on your computer

In the project root directory, run:
```bash
npm install
```

---

## 💻 4. How to Run the Project Locally

### Step 1: Initialize Database & Seed Content
```bash
# Push Prisma schema to local SQLite database
npx prisma db push

# Seed initial admin user, settings, activities, gallery, and testimonials
node prisma/seed.js
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Step 3: Run Production Build Locally
```bash
npm run build
npm run start
```

---

## 🔑 5. Required Environment Variables

Create a file named `.env` in the root folder (or use `.env.example` as a template):

```env
# Database Connection URL:
# For local SQLite:
DATABASE_URL="file:./dev.db"

# For production cloud database (Supabase / PostgreSQL / Neon):
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres?sslmode=require"

# JWT Secret for Admin Session Tokens (32+ random characters):
JWT_SECRET="rahmani-wa-raast-secret-key-2026-super-secure"

# Public Site URL:
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Default Admin User Credentials:
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="AdminPassword2026!"
```

---

## 🗄️ 6. Database Setup & Architecture

The application uses **Prisma ORM** with standard models:
- `AdminUser`: Secure admin credentials with bcrypt password hashing
- `AdmissionApplication`: Candidate records with unique reference numbers (`ADM-2026-XXXX`)
- `StudentActivity`: Campus events, science fairs, and Qirat ceremonies
- `GalleryItem`: Photos, videos, and YouTube embeds with captions
- `NewsAnnouncement`: Official bulletins and admission notices
- `ParentTestimonial`: Verified parent feedback
- `InstitutionalSetting`: Editable phone numbers, address, and live stats counters
- `ContactInquiry`: Contact inquiries submitted by visitors

### Switching from Local SQLite to Cloud PostgreSQL (for Vercel):
1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set your Supabase / Neon PostgreSQL connection string in your environment variables.
3. Run `npx prisma db push` and `node prisma/seed.js`.

---

## 🚀 7. How to Upload the Project to GitHub

Follow these steps in your terminal inside the project directory:

```bash
# 1. Initialize a new Git repository (if not already initialized)
git init

# 2. Check that .gitignore is active
git status

# 3. Add all project files
git add .

# 4. Commit all files
git commit -m "Initial commit: Complete Rahmani Islamic Center & Wa Raast Education System website"

# 5. Create a new repository on GitHub (e.g. named 'rahmani-wa-raast-education')
# Do not initialize with a README, .gitignore, or license since the project already has them.

# 6. Link your local repository to GitHub (replace with your actual GitHub URL)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rahmani-wa-raast-education.git

# 7. Push to GitHub
git push -u origin main
```

---

## ☁️ 8. How to Deploy Using Vercel

Vercel is the recommended hosting platform for Next.js applications:

### Step 1: Sign up on Vercel
Go to [vercel.com](https://vercel.com) and sign in using your GitHub account.

### Step 2: Import Your GitHub Repository
1. Click **"Add New..."** > **"Project"**.
2. Select your repository `rahmani-wa-raast-education`.
3. Vercel automatically detects **Next.js**.

### Step 3: Configure Environment Variables in Vercel
Under **"Environment Variables"**, add:
- `DATABASE_URL`: Your PostgreSQL / Supabase connection URL (e.g. from [Supabase](https://supabase.com) or [Neon](https://neon.tech)).
- `JWT_SECRET`: A long random string for admin sessions.
- `NEXT_PUBLIC_SITE_URL`: Your Vercel production domain (e.g., `https://your-site.vercel.app`).

### Step 4: Deploy
Click **"Deploy"**. Vercel will build the project and issue a live SSL-secured URL in under 2 minutes.

---

## 🌐 9. How to Connect a Custom Domain

1. In your Vercel Dashboard, go to your project > **Settings** > **Domains**.
2. Enter your custom domain (e.g., `rahmanisystem.edu.pk` or `www.rahmanisystem.edu.pk`).
3. Add the DNS records shown by Vercel to your domain registrar (GoDaddy, Namecheap, PKNIC, etc.):
   - **Type A:** `@` pointing to `76.76.21.21`
   - **Type CNAME:** `www` pointing to `cname.vercel-dns.com`
4. SSL certificates are provisioned automatically by Vercel for free.

---

## 🔐 10. Admin Portal & Login Credentials

- **Admin Login Route:** `/admin/login`
- **Default Username:** `admin`
- **Default Password:** `AdminPassword2026!`

The admin portal provides:
- Live admissions review, candidate filtering, and one-click **CSV Export**.
- Multimedia gallery uploads and YouTube recitation linking.
- Student activities publication with category filters.
- Announcements and urgent notice publication.
- Institutional settings and live homepage counter adjustments.

---

© 2026 Rahmani Islamic Center & Wa Raast Education System. Model Town, J Block, Lahore, Pakistan.  
Founder: **Hafiz Abdul Waheed Shahid Rupdi** (حافظ عبدالوحید شاہد روپڑی حفظہ اللہ).
