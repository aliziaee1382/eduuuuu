import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Award, 
  FileText, 
  Clock, 
  PlayCircle, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Printer, 
  X,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatToman } from '../../lib/utils';
import { Certificate } from '../../types';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    enrolledCourseIds, 
    setCurrentView, 
    setSelectedCourseId, 
    setSelectedLessonId,
    certificates,
    userNotes,
    deleteNote
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'notes'>('courses');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const handleOpenCertificateModal = (cert: Certificate) => {
    setSelectedCert(cert);
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleContinueCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseId(course.id);
      const firstLesson = course.modules[0]?.lessons[0]?.id || 'les-py-1';
      setSelectedLessonId(firstLesson);
      setCurrentView('player');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
            />
            <div className="space-y-1 text-center sm:text-right">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold rounded-lg">
                  دانشجوی فعال
                </span>
              </div>
              <p className="text-xs text-slate-400 dir-ltr font-mono">{currentUser.phone}</p>
              <p className="text-xs text-slate-400">عضویت از تیرماه ۱۴۰۵</p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center space-y-1">
              <BookOpen className="w-5 h-5 text-indigo-400 mx-auto" />
              <span className="text-lg font-black text-white block">{enrolledCourses.length}</span>
              <span className="text-[10px] text-slate-400 block">دوره‌های من</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center space-y-1">
              <Award className="w-5 h-5 text-amber-400 mx-auto" />
              <span className="text-lg font-black text-white block">{certificates.length}</span>
              <span className="text-[10px] text-slate-400 block">گواهینامه‌ها</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center space-y-1">
              <FileText className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-lg font-black text-white block">{userNotes.length}</span>
              <span className="text-[10px] text-slate-400 block">یادداشت‌ها</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'courses' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            دوره‌های من ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'certificates' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            گواهینامه‌های صادرشده ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'notes' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            یادداشت‌های شخصی ({userNotes.length})
          </button>
        </div>

        {/* TAB 1: MY COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  دوره‌های مورد علاقه خود در حوزه پایتون، ری‌اکت و هوش مصنوعی را مرور کرده و یادگیری را شروع کنید.
                </p>
                <button
                  onClick={() => setCurrentView('courses')}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors"
                >
                  مشاهده لیست دوره‌ها
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-3 sm:p-5 space-y-2.5 sm:space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 relative">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 bg-slate-900/80 text-slate-300 text-[9px] sm:text-[10px] font-bold rounded">
                          {course.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">{course.title}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-400">مدرس: {course.instructor.name}</p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-800">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>میزان پیشرفت:</span>
                          <span className="font-bold text-indigo-400">٪۴۰</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[40%]" />
                        </div>
                      </div>

                      <button
                        onClick={() => handleContinueCourse(course.id)}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        ادامه یادگیری و پخش ویدیو
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">کد استعلام: {cert.code}</span>
                        <h3 className="text-sm font-bold text-white mt-0.5">{cert.courseTitle}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>تاریخ صدور: {cert.issueDate}</span>
                    <span>استاد: {cert.instructorName}</span>
                  </div>

                  <button
                    onClick={() => handleOpenCertificateModal(cert)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <Printer className="w-4 h-4" />
                    مشاهده و چاپ مدرک رسمی PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            {userNotes.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-10">هیچ یادداشتی ذخیره نشده است.</p>
            ) : (
              userNotes.map(n => (
                <div key={n.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-400 font-bold block">{n.lessonTitle} ({n.timestampLabel})</span>
                    <p className="text-slate-200">{n.content}</p>
                  </div>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Official Certificate Modal (Generates printable Persian PDF certificate layout!) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 space-y-6">
            
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Frame Printable Layout */}
            <div className="border-4 border-double border-amber-500/50 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-center space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-4">
                <span className="text-xs font-mono text-amber-400 font-bold">کد استعلام: {selectedCert.code}</span>
                <span className="text-sm font-bold text-white">آکادمی برنامه‌نویسی مکتب‌کد</span>
                <span className="text-xs text-slate-400">تاریخ: {selectedCert.issueDate}</span>
              </div>

              <div className="space-y-2 pt-2">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                  <Award className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wide">گواهینامه پایان دوره آموزشی</h2>
                <p className="text-xs text-slate-400">Certifcate of Completion</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto py-2">
                <p>
                  بدین‌وسیله گواهی می‌شود دانشجو <span className="text-lg font-black text-white px-2 underline decoration-amber-500 decoration-2">{selectedCert.studentName}</span> با موفقیت تمام فصل‌ها، پروژه‌های عملی و ارزیابی‌های مربوط به دوره آموزشی:
                </p>
                <p className="text-base sm:text-lg font-black text-indigo-300 bg-slate-900/90 py-3 px-4 rounded-xl border border-indigo-500/30">
                  «{selectedCert.courseTitle}»
                </p>
                <p className="text-xs text-slate-400">
                  به مدت <span className="font-bold text-white">{selectedCert.completionHours} ساعت</span> را به پایان رسانده و شایستگی لازم را احراز نموده است.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-amber-500/30 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">مدرس و تاییدکننده دوره:</span>
                  <span className="font-bold text-white block">{selectedCert.instructorName}</span>
                </div>
                <div className="w-16 h-16 border border-slate-700 bg-white p-1 rounded-lg">
                  {/* Mock QR Code */}
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[8px] font-mono text-amber-400">
                    VERIFIED
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block text-[10px]">مدیریت آموزش آکادمی:</span>
                  <span className="font-bold text-amber-400 block">مکتب‌کد (MaktabCode)</span>
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                دانلود / پرینت PDF گواهینامه
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
