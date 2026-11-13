import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Rahmani Islamic Center & Wa Raast Education System | Model Town, Lahore',
  description:
    'Building a generation with Quranic values and modern academic excellence. Founded by Hafiz Abdul Waheed Shahid Rupdi. Dedicated Quranic memorization (Hifz) and accelerated science and mathematics education in Model Town, J Block, Lahore, Pakistan.',
  keywords: [
    'Rahmani Islamic Center',
    'Wa Raast Education System',
    'Hafiz Abdul Waheed Shahid Rupdi',
    'Hifz-ul-Quran Lahore',
    'Model Town Islamic School',
    'Nazra Quran Tajweed',
    'Science Education for Huffaz',
    'Islamic School Lahore',
    'Dual Stream Education Pakistan',
  ],
  authors: [{ name: 'Rahmani Islamic Center & Wa Raast Education System' }],
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#FDFAF4] text-[#0E1726]">
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
