import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  DollarSign, 
  Users, 
  BookOpen, 
  Star, 
  MessageSquare, 
  Upload, 
  CheckCircle2, 
  CreditCard,
  Send,
  FileVideo
} from 'lucide-react';
import { formatToman } from '../../lib/utils';
import { Course } from '../../types';

export const InstructorDashboard: React.FC = () => {
  const { courses, addNewCourse, questions, addAnswer, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'create' | 'questions' | 'payout'>('courses');

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'python' | 'javascript' | 'ai' | 'mobile' | 'backend'>('python');
  const [newLevel, setNewLevel] = useState<'مبتدی' | 'متوسط' | 'پیشرفته'>('مبتدی');
  const [newPrice, setNewPrice] = useState('1500000');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullDesc, setNewFullDesc] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');

  // Payout request
  const [shabaNumber, setShabaNumber] = useState('IR620170000000012345678901');

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const priceNum = parseInt(newPrice);
    const createdCourse: Course = {
      id: `course-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      category: newCategory,
      categoryLabel: newCategory === 'python' ? 'پایتون' : newCategory === 'javascript' ? 'فرانت‌اند' : 'هوش مصنوعی',
      level: newLevel,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      price: priceNum,
      discountPrice: Math.round(priceNum * 0.8),
      discountPercent: 20,
      rating: 5.0,
      ratingCount: 1,
      studentsCount: 0,
      durationHours: 12,
      lessonsCount: 1,
      instructor: {
        id: 'inst-current',
        name: 'استاد مدرس',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        roleTitle: 'مدرس ارشد پلتفرم',
        bio: 'مدرس با سابقه برنامه‌نویسی وب و هوش مصنوعی',
        rating: 4.9,
        studentsCount: 1200,
        coursesCount: 3,
      },
      shortDescription: newShortDesc || 'دوره آموزشی جدید ثبت شده توسط مدرس.',
      fullDescription: newFullDesc || 'توضیحات کامل دوره آموزشی.',
      prerequisites: ['آشنایی اولیه با رایانه'],
      learningOutcomes: ['تسلط کامل بر سرفصل‌های این دوره'],
      status: 'pending', // Sent for admin approval!
      updatedAt: 'امروز',
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: 'فصل اول: مقدمه و شروع دوره',
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: newLessonTitle || 'جلسه اول: خوش‌آمدگویی و معرفی سرفصل‌ها',
              duration: '۱۵:۰۰',
              durationSeconds: 900,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              isFreePreview: true,
              summary: 'جلسه اول معرفی دوره.',
            }
          ]
        }
      ],
      reviews: [],
    };

    addNewCourse(createdCourse);
    setActiveTab('courses');
    setNewTitle('');
    setNewShortDesc('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Instructor Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-right">
            <h1 className="text-xl sm:text-2xl font-black text-white">پنل اختصاصی مدرسین</h1>
            <p className="text-xs text-slate-400">مدیریت دوره‌ها، آپلود جلسات جدید و پاسخگویی به دانشجویان</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">درآمد کل</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 block mt-1">
                {formatToman(42800000)}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">کل دانشجویان</span>
              <span className="text-sm sm:text-base font-black text-indigo-400 block mt-1">
                ۴,۵۲۰ نفر
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">امتیاز مدرس</span>
              <span className="text-sm sm:text-base font-black text-amber-400 block mt-1">
                ⭐ ۴.۹
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            دوره‌های من ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            آپلود دوره جدید
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            سوالات دانشجویان ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('payout')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'payout' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            تسویه‌حساب و درآمد
          </button>
        </div>

        {/* TAB 1: LIST COURSES */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-5 space-y-2 sm:space-y-3">
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold ${
                    course.status === 'published' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-slate-950'
                  }`}>
                    {course.status === 'published' ? 'منتشر شده' : 'در انتظار تایید'}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{course.title}</h3>
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
                  <span>فروش: {course.studentsCount}</span>
                  <span className="font-bold text-indigo-300">{formatToman(course.price)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CREATE COURSE WIZARD */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateCourseSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Upload className="w-5 h-5 text-indigo-400" />
              فرم ایجاد دوره آموزشی جدید
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">عنوان دوره آموزشی</label>
                <input
                  type="text"
                  placeholder="مثلا: دوره جامع آموزش FastAPI و Microservices با پایتون"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">دسته‌بندی</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-white"
                  >
                    <option value="python">پایتون</option>
                    <option value="javascript">فرانت‌اند / React</option>
                    <option value="ai">هوش مصنوعی</option>
                    <option value="mobile">موبایل</option>
                    <option value="backend">بک‌اند</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">سطح آموزشی</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-white"
                  >
                    <option value="مبتدی">مبتدی</option>
                    <option value="متوسط">متوسط</option>
                    <option value="پیشرفته">پیشرفته</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">قیمت (تومان)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">توضیح کوتاه دوره</label>
                <input
                  type="text"
                  placeholder="خلاصه هدف دوره در یک یا دو جمله..."
                  value={newShortDesc}
                  onChange={e => setNewShortDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">عنوان اولین جلسه ویدیویی</label>
                <input
                  type="text"
                  placeholder="جلسه ۱: آشنایی با ساختار پروژه..."
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-dashed border-slate-800 text-center space-y-2">
                <FileVideo className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="text-slate-300 font-semibold">آپلود یا لینک ویدیوی جلسه اول</p>
                <p className="text-[11px] text-slate-500">پس از ثبت، دوره جهت بررسی کیفیت محتوا به پنل ادمین ارسال می‌گردد.</p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors shadow-xl shadow-indigo-600/25"
              >
                ثبت دوره و ارسال جهت تایید مدیریت
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: QUESTIONS */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            {questions.map(qa => (
              <div key={qa.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{qa.studentName} پرسیده است:</span>
                  <span className="text-[10px] text-slate-500">{qa.createdAt}</span>
                </div>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl">{qa.question}</p>

                {qa.answers.map(ans => (
                  <div key={ans.id} className="mr-4 p-3 bg-indigo-950/40 border-r-2 border-indigo-500 rounded-l-xl text-indigo-200">
                    <span className="font-bold block mb-1">پاسخ ثبت شده شما:</span>
                    <p>{ans.content}</p>
                  </div>
                ))}

                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="پاسخ خود به عنوان مدرس را بنویسید..."
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        addAnswer(qa.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PAYOUT */}
        {activeTab === 'payout' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              درخواست تسویه‌حساب درآمد
            </h2>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">موجودی قابل تسویه:</span>
                <span className="font-bold text-emerald-400 text-sm">{formatToman(42800000)}</span>
              </div>
              <p className="text-[11px] text-slate-500">واریز به حساب شبا ظرف ۲۴ ساعت کاری انجام می‌شود.</p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-300">شماره شبا بانکی</label>
              <input
                type="text"
                value={shabaNumber}
                onChange={e => setShabaNumber(e.target.value)}
                dir="ltr"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 font-mono text-white"
              />
            </div>

            <button
              onClick={() => showToast('درخواست تسویه‌حساب با موفقیت ثبت شد.')}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-colors"
            >
              ثبت درخواست واریز
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
