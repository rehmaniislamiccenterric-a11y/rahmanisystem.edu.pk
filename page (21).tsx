'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  GraduationCap, 
  Image as ImageIcon, 
  Bell, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Trash2, 
  Plus, 
  ExternalLink,
  MessageCircle,
  Home,
  Save,
  Layers,
  Sparkles,
  BookOpen,
  Atom,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'gallery' | 'activities' | 'news' | 'settings'>('overview');
  
  // Data states
  const [adminUser, setAdminUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    phone: '',
    whatsapp: '',
    email: '',
    addressEn: '',
    addressUr: '',
    statHifzGraduates: 240,
    statAcademicStudents: 410,
    statQualifiedFaculty: 32,
    statEstablishedYear: 2014,
  });

  // Admission filters
  const [admSearch, setAdmSearch] = useState('');
  const [admDept, setAdmDept] = useState('ALL');
  const [admStatus, setAdmStatus] = useState('ALL');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  // Forms for adding items
  const [newGallery, setNewGallery] = useState({
    titleEn: '',
    titleUr: '',
    category: 'RAHMANI_ISLAMIC',
    mediaType: 'PHOTO',
    mediaUrl: '',
    youtubeUrl: '',
    captionEn: '',
    captionUr: '',
  });

  const [newActivity, setNewActivity] = useState({
    titleEn: '',
    titleUr: '',
    category: 'Quran Recitation',
    mediaType: 'IMAGE',
    mediaUrl: '',
    descriptionEn: '',
    descriptionUr: '',
    activityDate: new Date().toISOString().split('T')[0],
  });

  const [newNews, setNewNews] = useState({
    titleEn: '',
    titleUr: '',
    summaryEn: '',
    summaryUr: '',
    category: 'NOTICE',
    priority: 'NORMAL',
  });

  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // 1. Check Auth & Load Initial Data
  useEffect(() => {
    async function initDashboard() {
      try {
        const meRes = await fetch('/api/admin/me');
        const meData = await meRes.json();
        if (!meRes.ok || !meData.authenticated) {
          router.push('/admin/login');
          return;
        }
        setAdminUser(meData.admin);
        await refreshAllData();
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, []);

  const refreshAllData = async () => {
    try {
      const [appRes, galRes, actRes, newsRes, setRes, inqRes] = await Promise.all([
        fetch('/api/admissions').then(r => r.json()).catch(() => ({ applications: [] })),
        fetch('/api/gallery').then(r => r.json()).catch(() => ({ items: [] })),
        fetch('/api/activities').then(r => r.json()).catch(() => ({ activities: [] })),
        fetch('/api/news').then(r => r.json()).catch(() => ({ announcements: [] })),
        fetch('/api/admin/settings').then(r => r.json()).catch(() => ({ settings: {} })),
        fetch('/api/contact').then(r => r.json()).catch(() => ({ inquiries: [] })),
      ]);

      if (appRes?.applications) setApplications(appRes.applications);
      if (galRes?.items) setGallery(galRes.items);
      if (actRes?.activities) setActivities(actRes.activities);
      if (newsRes?.announcements) setNews(newsRes.announcements);
      if (setRes?.settings) setSettings(setRes.settings);
      if (inqRes?.inquiries) setInquiries(inqRes.inquiries);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // 2. Admission Status Update
  const updateApplicationStatus = async (id: string, newStatus: string, remarks?: string) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminRemarks: remarks }),
      });
      if (res.ok) {
        setFeedbackMsg(`Application marked as ${newStatus}`);
        setTimeout(() => setFeedbackMsg(''), 3000);
        refreshAllData();
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication((prev: any) => ({ ...prev, status: newStatus, adminRemarks: remarks }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Export Admissions to CSV
  const exportAdmissionsCSV = () => {
    if (applications.length === 0) return;
    const headers = ['RefNumber,StudentName,FatherName,DOB,Gender,Phone,WhatsApp,Department,Program,Status,Date'];
    const rows = applications.map(app => 
      `"${app.referenceNumber}","${app.studentName}","${app.fatherName}","${app.dob}","${app.gender}","${app.fatherContact}","${app.whatsappNumber}","${app.department}","${app.admissionProgram}","${app.status}","${new Date(app.createdAt).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Create Gallery Item
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });
      if (res.ok) {
        setFeedbackMsg('Gallery item added successfully!');
        setTimeout(() => setFeedbackMsg(''), 3000);
        setNewGallery({
          titleEn: '',
          titleUr: '',
          category: 'RAHMANI_ISLAMIC',
          mediaType: 'PHOTO',
          mediaUrl: '',
          youtubeUrl: '',
          captionEn: '',
          captionUr: '',
        });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    refreshAllData();
  };

  // 5. Create Activity
  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity),
      });
      if (res.ok) {
        setFeedbackMsg('Student activity published!');
        setTimeout(() => setFeedbackMsg(''), 3000);
        setNewActivity({
          titleEn: '',
          titleUr: '',
          category: 'Quran Recitation',
          mediaType: 'IMAGE',
          mediaUrl: '',
          descriptionEn: '',
          descriptionUr: '',
          activityDate: new Date().toISOString().split('T')[0],
        });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    await fetch(`/api/activities/${id}`, { method: 'DELETE' });
    refreshAllData();
  };

  // 6. Create News
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews),
      });
      if (res.ok) {
        setFeedbackMsg('Announcement published!');
        setTimeout(() => setFeedbackMsg(''), 3000);
        setNewNews({
          titleEn: '',
          titleUr: '',
          summaryEn: '',
          summaryUr: '',
          category: 'NOTICE',
          priority: 'NORMAL',
        });
        refreshAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    refreshAllData();
  };

  // 7. Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setFeedbackMsg('Institutional settings updated successfully!');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesDept = admDept === 'ALL' || app.department === admDept;
    const matchesStatus = admStatus === 'ALL' || app.status === admStatus;
    const q = admSearch.toLowerCase();
    const matchesSearch = !q || 
      app.studentName.toLowerCase().includes(q) ||
      app.fatherName.toLowerCase().includes(q) ||
      app.referenceNumber.toLowerCase().includes(q) ||
      app.whatsappNumber.includes(q);
    return matchesDept && matchesStatus && matchesSearch;
  });

  const pendingCount = applications.filter(a => a.status === 'PENDING').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = applications.filter(a => a.status === 'REJECTED').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-gold-400 mx-auto" />
          <p className="text-sm">Loading Institutional Admin Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      
      {/* Top Admin Header */}
      <header className="bg-navy-900 border-b border-navy-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-gold-400">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-gold-500/50 bg-white p-0.5 flex-shrink-0">
              <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded" />
            </div>
            <span className="font-bold text-xs sm:text-sm">Public Website</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
              Rahmani Islamic Center & Wa Raast Education System
            </h1>
            <p className="text-xs text-gold-400">
              Admin Portal • Logged in as: <span className="text-white font-medium">{adminUser?.name || 'Administrator'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={refreshAllData}
            title="Refresh Data"
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold border border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-navy-900/60 border-r border-navy-800 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Layers },
            { id: 'admissions', label: 'Admissions', icon: GraduationCap, badge: pendingCount > 0 ? pendingCount : null },
            { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
            { id: 'activities', label: 'Student Activities', icon: Sparkles },
            { id: 'news', label: 'News & Announcements', icon: Bell },
            { id: 'settings', label: 'Settings & Stats', icon: Settings },
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-md' 
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-navy-950">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Dashboard Main Workspace */}
        <main className="flex-grow p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {feedbackMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Institutional Overview</h2>
                <p className="text-xs text-slate-400">Current admissions statistics and published content counters</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-1">
                  <span className="text-xs text-slate-400">Total Applications</span>
                  <div className="text-3xl font-extrabold text-white font-mono">{applications.length}</div>
                </div>

                <div className="bg-navy-900 border border-amber-500/30 p-5 rounded-2xl space-y-1">
                  <span className="text-xs text-amber-400 font-semibold">Pending Review</span>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">{pendingCount}</div>
                </div>

                <div className="bg-navy-900 border border-emerald-500/30 p-5 rounded-2xl space-y-1">
                  <span className="text-xs text-emerald-400 font-semibold">Approved Students</span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">{approvedCount}</div>
                </div>

                <div className="bg-navy-900 border border-red-500/30 p-5 rounded-2xl space-y-1">
                  <span className="text-xs text-red-400 font-semibold">Rejected / Ineligible</span>
                  <div className="text-3xl font-extrabold text-red-400 font-mono">{rejectedCount}</div>
                </div>
              </div>

              {/* Quick Jump Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-navy-800 pb-3">
                    <h3 className="font-bold text-sm text-gold-400">Recent Applications</h3>
                    <button onClick={() => setActiveTab('admissions')} className="text-xs text-slate-400 hover:text-white">View All</button>
                  </div>
                  <div className="space-y-2.5">
                    {applications.slice(0, 4).map(app => (
                      <div key={app.id} className="p-3 bg-navy-950 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-white block">{app.studentName}</span>
                          <span className="text-slate-400 text-[11px] font-mono">{app.referenceNumber} • {app.department === 'RAHMANI_ISLAMIC' ? 'Rahmani Center' : 'Wa Raast Education'}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                          app.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-navy-800 pb-3">
                    <h3 className="font-bold text-sm text-sky-400">Public Contact Inquiries</h3>
                    <span className="text-xs text-slate-400">{inquiries.length} received</span>
                  </div>
                  <div className="space-y-2.5">
                    {inquiries.length > 0 ? (
                      inquiries.slice(0, 4).map(inq => (
                        <div key={inq.id} className="p-3 bg-navy-950 rounded-xl text-xs space-y-1">
                          <div className="flex justify-between text-white font-bold">
                            <span>{inq.name} ({inq.phone})</span>
                            <span className="text-[10px] text-slate-500 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] truncate">{inq.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 py-4 text-center">No inquiries currently received.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ADMISSIONS MANAGEMENT */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Online Admission Applications</h2>
                  <p className="text-xs text-slate-400">Inspect candidate profiles, approve/reject applications, and export data</p>
                </div>

                <button
                  onClick={exportAdmissionsCSV}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={admSearch}
                    onChange={(e) => setAdmSearch(e.target.value)}
                    placeholder="Search by student, father, ref #..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <select
                  value={admDept}
                  onChange={(e) => setAdmDept(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Departments</option>
                  <option value="RAHMANI_ISLAMIC">Rahmani Islamic Center</option>
                  <option value="WA_EDUCATION">Wa Raast Education System</option>
                </select>

                <select
                  value={admStatus}
                  onChange={(e) => setAdmStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending Only</option>
                  <option value="APPROVED">Approved Only</option>
                  <option value="REJECTED">Rejected Only</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-navy-950 border-b border-navy-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Reference #</th>
                        <th className="px-4 py-3">Student Name</th>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3">Program</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-800">
                      {filteredApplications.length > 0 ? (
                        filteredApplications.map(app => (
                          <tr key={app.id} className="hover:bg-navy-800/40 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-gold-400">{app.referenceNumber}</td>
                            <td className="px-4 py-3 font-semibold text-white">
                              {app.studentName}
                              <span className="block text-[11px] text-slate-400 font-normal">S/O {app.fatherName}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.department === 'RAHMANI_ISLAMIC' ? 'bg-gold-500/10 text-gold-400' : 'bg-sky-500/10 text-academic-400'
                              }`}>
                                {app.department === 'RAHMANI_ISLAMIC' ? 'Rahmani Islamic' : 'Wa Raast Education'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300 max-w-xs truncate">{app.admissionProgram}</td>
                            <td className="px-4 py-3 font-mono text-slate-300">
                              <a 
                                href={`https://wa.me/${app.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center text-emerald-400 hover:underline"
                              >
                                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                                {app.whatsappNumber}
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                app.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right space-x-1.5">
                              <button
                                onClick={() => setSelectedApplication(app)}
                                title="View Details"
                                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => updateApplicationStatus(app.id, 'APPROVED')}
                                title="Approve"
                                className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                                title="Reject"
                                className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-500">
                            No applications match your filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Candidate Details Modal */}
              {selectedApplication && (
                <div 
                  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
                  onClick={() => setSelectedApplication(null)}
                >
                  <div 
                    className="bg-navy-900 border border-navy-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-white max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-start border-b border-navy-800 pb-4">
                      <div>
                        <span className="text-xs text-gold-400 font-mono font-bold block">{selectedApplication.referenceNumber}</span>
                        <h3 className="text-xl font-bold text-white">{selectedApplication.studentName}</h3>
                        <p className="text-xs text-slate-400">Father / Guardian: {selectedApplication.fatherName}</p>
                      </div>
                      <button onClick={() => setSelectedApplication(null)} className="text-slate-400 hover:text-white">✕</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Date of Birth & Gender</span>
                        <span className="font-semibold">{selectedApplication.dob} ({selectedApplication.gender})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">WhatsApp / Phone</span>
                        <span className="font-mono text-emerald-400 font-bold">{selectedApplication.whatsappNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Department</span>
                        <span className="font-bold text-gold-400">{selectedApplication.department}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Program Applied</span>
                        <span className="font-semibold text-white">{selectedApplication.admissionProgram}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Previous Class / School</span>
                        <span>{selectedApplication.previousClass || 'N/A'} ({selectedApplication.previousSchool || 'None'})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Current Level</span>
                        <span>{selectedApplication.currentLevel || 'N/A'}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block">Residential Address</span>
                        <span className="text-slate-200">{selectedApplication.address}</span>
                      </div>
                      {selectedApplication.additionalNotes && (
                        <div className="col-span-2 p-3 bg-navy-950 rounded-xl">
                          <span className="text-slate-400 block font-semibold mb-1">Parent Notes:</span>
                          <p className="text-slate-300">{selectedApplication.additionalNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-navy-800 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">Current Status:</span>
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-navy-950 border border-navy-700 text-gold-400">
                          {selectedApplication.status}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateApplicationStatus(selectedApplication.id, 'APPROVED')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                        >
                          Approve Candidate
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(selectedApplication.id, 'REJECTED')}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Multimedia Gallery Management</h2>
                <p className="text-xs text-slate-400">Upload photos, link YouTube recitations, and manage media cards</p>
              </div>

              {/* Add New Media Form */}
              <form onSubmit={handleAddGallery} className="bg-navy-900 border border-navy-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-gold-400">Add New Photo / Video</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      value={newGallery.titleEn}
                      onChange={(e) => setNewGallery({ ...newGallery, titleEn: e.target.value })}
                      required
                      placeholder="e.g. Science Lab Demonstration"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Title (Urdu)</label>
                    <input
                      type="text"
                      value={newGallery.titleUr}
                      onChange={(e) => setNewGallery({ ...newGallery, titleUr: e.target.value })}
                      placeholder="سائنسی تجربات کی تصویری جھلکیاں"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Category *</label>
                    <select
                      value={newGallery.category}
                      onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    >
                      <option value="RAHMANI_ISLAMIC">Rahmani Islamic Center</option>
                      <option value="WA_EDUCATION">Wa Raast Education System</option>
                      <option value="CEREMONIES">Ceremonies & Awards</option>
                      <option value="CAMPUS">Campus & Library</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Media Type</label>
                    <select
                      value={newGallery.mediaType}
                      onChange={(e) => setNewGallery({ ...newGallery, mediaType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    >
                      <option value="PHOTO">Photo</option>
                      <option value="YOUTUBE">YouTube Video</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Image / Poster URL *</label>
                    <input
                      type="url"
                      value={newGallery.mediaUrl}
                      onChange={(e) => setNewGallery({ ...newGallery, mediaUrl: e.target.value })}
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {newGallery.mediaType === 'YOUTUBE' && (
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">YouTube Video Link</label>
                      <input
                        type="url"
                        value={newGallery.youtubeUrl}
                        onChange={(e) => setNewGallery({ ...newGallery, youtubeUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs"
                >
                  Add to Public Gallery
                </button>
              </form>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.map(item => (
                  <div key={item.id} className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden p-4 space-y-3">
                    <img src={item.mediaUrl} alt={item.titleEn} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-white">{item.titleEn}</h4>
                        <span className="text-[10px] text-slate-400">{item.category} • {item.mediaType}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-1 rounded text-red-400 hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Student Activities Management</h2>
                <p className="text-xs text-slate-400">Publish daily school activities, Qirat completions, and science workshops</p>
              </div>

              {/* Add Activity Form */}
              <form onSubmit={handleAddActivity} className="bg-navy-900 border border-navy-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-gold-400">Publish New Student Activity</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      value={newActivity.titleEn}
                      onChange={(e) => setNewActivity({ ...newActivity, titleEn: e.target.value })}
                      required
                      placeholder="e.g. Annual Hifz Sanad Distribution"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Title (Urdu) *</label>
                    <input
                      type="text"
                      value={newActivity.titleUr}
                      onChange={(e) => setNewActivity({ ...newActivity, titleUr: e.target.value })}
                      required
                      placeholder="سالانہ دستار بندی و تکمیلِ حفظ تقریب"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Category *</label>
                    <select
                      value={newActivity.category}
                      onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    >
                      <option value="Quran Recitation">Quran Recitation</option>
                      <option value="Hifz Activities">Hifz Activities</option>
                      <option value="Quran Completion Ceremonies">Quran Completion Ceremonies</option>
                      <option value="Science Experiments">Science Experiments</option>
                      <option value="Mathematics Activities">Mathematics Activities</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Image URL *</label>
                    <input
                      type="url"
                      value={newActivity.mediaUrl}
                      onChange={(e) => setNewActivity({ ...newActivity, mediaUrl: e.target.value })}
                      required
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Description (English)</label>
                    <textarea
                      rows={2}
                      value={newActivity.descriptionEn}
                      onChange={(e) => setNewActivity({ ...newActivity, descriptionEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Description (Urdu)</label>
                    <textarea
                      rows={2}
                      value={newActivity.descriptionUr}
                      onChange={(e) => setNewActivity({ ...newActivity, descriptionUr: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs"
                >
                  Publish Activity
                </button>
              </form>

              {/* List */}
              <div className="space-y-3">
                {activities.map(act => (
                  <div key={act.id} className="p-4 bg-navy-900 border border-navy-800 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-white text-sm">{act.titleEn}</h4>
                      <p className="text-gold-400">{act.titleUr}</p>
                      <span className="text-[11px] text-slate-500">{act.category} • {act.activityDate}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteActivity(act.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                      title="Delete Activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NEWS & ANNOUNCEMENTS */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">News & Announcements</h2>
                <p className="text-xs text-slate-400">Manage notices, admission dates, and urgent institutional alerts</p>
              </div>

              {/* Add News */}
              <form onSubmit={handleAddNews} className="bg-navy-900 border border-navy-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm text-gold-400">Post Announcement</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      value={newNews.titleEn}
                      onChange={(e) => setNewNews({ ...newNews, titleEn: e.target.value })}
                      required
                      placeholder="e.g. Admissions Open for Session 2026-2027"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Title (Urdu)</label>
                    <input
                      type="text"
                      value={newNews.titleUr}
                      onChange={(e) => setNewNews({ ...newNews, titleUr: e.target.value })}
                      placeholder="داخلے جاری ہیں تعلیمی سال 2026-2027"
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={newNews.category}
                      onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    >
                      <option value="ADMISSION">Admission</option>
                      <option value="ACHIEVEMENT">Achievement</option>
                      <option value="EVENT">Event</option>
                      <option value="NOTICE">General Notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Priority</label>
                    <select
                      value={newNews.priority}
                      onChange={(e) => setNewNews({ ...newNews, priority: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    >
                      <option value="NORMAL">Normal</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent (Highlighted in red)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Summary (English) *</label>
                    <textarea
                      rows={2}
                      value={newNews.summaryEn}
                      onChange={(e) => setNewNews({ ...newNews, summaryEn: e.target.value })}
                      required
                      placeholder="Brief summary shown on homepage and news board..."
                      className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs"
                >
                  Publish Announcement
                </button>
              </form>

              {/* News List */}
              <div className="space-y-3">
                {news.map(n => (
                  <div key={n.id} className="p-4 bg-navy-900 border border-navy-800 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-950 text-gold-400">{n.category}</span>
                      <h4 className="font-bold text-white text-sm mt-1">{n.titleEn}</h4>
                      <p className="text-slate-400 text-xs">{n.summaryEn}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNews(n.id)}
                      className="p-2 text-red-400 hover:text-red-300"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & STATS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="text-xl font-bold text-white">Institutional Content & Settings</h2>
                <p className="text-xs text-slate-400">Update actual institutional statistics, contact phone numbers, WhatsApp, and location</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-navy-900 border border-navy-800 p-6 sm:p-8 rounded-3xl space-y-6">
                
                {/* Stats Counters */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-gold-400 border-b border-navy-800 pb-2">
                    Homepage Statistics Counters (No Fake Stats)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Hifz Graduates Count</label>
                      <input
                        type="number"
                        value={settings.statHifzGraduates}
                        onChange={(e) => setSettings({ ...settings, statHifzGraduates: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Academic Students Count</label>
                      <input
                        type="number"
                        value={settings.statAcademicStudents}
                        onChange={(e) => setSettings({ ...settings, statAcademicStudents: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Certified Faculty Count</label>
                      <input
                        type="number"
                        value={settings.statQualifiedFaculty}
                        onChange={(e) => setSettings({ ...settings, statQualifiedFaculty: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Established Year</label>
                      <input
                        type="number"
                        value={settings.statEstablishedYear}
                        onChange={(e) => setSettings({ ...settings, statEstablishedYear: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 pt-4 border-t border-navy-800">
                  <h3 className="font-bold text-sm text-sky-400 border-b border-navy-800 pb-2">
                    Official Contact Information (Model Town Lahore)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Landline Phone</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Address (English)</label>
                      <input
                        type="text"
                        value={settings.addressEn}
                        onChange={(e) => setSettings({ ...settings, addressEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Address (Urdu)</label>
                      <input
                        type="text"
                        value={settings.addressUr}
                        onChange={(e) => setSettings({ ...settings, addressUr: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Institutional Settings</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
