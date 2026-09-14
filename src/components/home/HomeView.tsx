import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../course/CourseCard';
import { 
  Sparkles, 
  Code2, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Users, 
  PlayCircle, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  SlidersHorizontal,
  Star,
  Newspaper,
  ChevronLeft
} from 'lucide-react';
import { mockLearningPaths, mockBlogPosts, mockInstructors } from '../../data/mockData';

export const HomeView: React.FC = () => {
  const { 
    courses, 
    setCurrentView, 
    setSelectedCourseId, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setCoursePriceType,
    setSelectedBlogId
  } = useApp();

  const sliderCourses = courses.slice(0, 4);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (sliderCourses.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % sliderCourses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderCourses.length]);

  const activeCourse = (sliderCourses.length > 0 && currentSlideIndex < sliderCourses.length) 
    ? sliderCourses[currentSlideIndex] 
    : (courses[0] || null);
  const featuredCourses = courses.filter(c => c.isFeatured || c.isBestSeller);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800/80 pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Right text content */}
            <div className="space-y-6 text-center lg:text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>پلتفرم تخصصی آموزش و پخش آنلاین دوره‌های برنامه‌نویسی</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-snug">
                از صفر برنامه‌نویسی بیاموزید، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 via-cyan-300 to-indigo-300">
                  حرفه‌ای وارد بازار کار شوید
                </span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                مشاهده آنلاین دوره‌های پایتون، ری‌اکت، هوش مصنوعی و فلاتر در پلیر هوشمند اختصاصی همراه با سیستم یادداشت‌برداری زمان‌دار، سورس‌کدهای پروژه و صدور گواهینامه معتبر.
              </p>

              {/* Search Bar inside Hero */}
              <div className="pt-2 max-w-lg mx-auto lg:mx-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="جستجوی عنوان دوره، پایتون، React..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') setCurrentView('courses');
                    }}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-28 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
                  />
                  <button
                    onClick={() => setCurrentView('courses')}
                    className="absolute left-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shadow-md shadow-indigo-600/20"
                  >
                    <Search className="w-3.5 h-3.5" />
                    جستجو
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('courses');
                  }}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs md:text-sm transition-all shadow-xl shadow-indigo-600/25 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  مشاهده تمام دوره‌ها
                </button>
                <button
                  onClick={() => setCurrentView('paths')}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold rounded-2xl text-xs md:text-sm transition-colors flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                  مسیرهای شغلی
                </button>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-center">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">۱۸,۰۰۰+</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">دانشجوی فعال</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">۴.۹ / ۵</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">رضایت دانشجویان</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">۱۰۰٪</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">پروژه‌محور</span>
                </div>
              </div>

            </div>

            {/* Left featured course card preview (Slider) */}
            {activeCourse && (
              <div className="relative">
                <div className="relative z-10 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      جدیدترین دوره‌ها ({currentSlideIndex + 1} از {sliderCourses.length})
                    </span>
                    
                    {/* Slider Pagination Indicators */}
                    <div className="flex items-center gap-1.5 dir-ltr">
                      {sliderCourses.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentSlideIndex 
                              ? 'w-6 bg-indigo-500' 
                              : 'w-2 bg-slate-700 hover:bg-slate-600'
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      if (activeCourse?.id) {
                        setSelectedCourseId(activeCourse.id);
                        setCurrentView('course-detail');
                      }
                    }}
                    className="aspect-video rounded-2xl overflow-hidden relative bg-slate-900 border border-slate-800 group cursor-pointer"
                  >
                    <img
                      key={activeCourse.id}
                      src={activeCourse.thumbnail}
                      alt={activeCourse.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="space-y-2">
                    <h3 
                      onClick={() => {
                        if (activeCourse?.id) {
                          setSelectedCourseId(activeCourse.id);
                          setCurrentView('course-detail');
                        }
                      }}
                      className="text-base font-bold text-white leading-snug cursor-pointer hover:text-indigo-400 transition-colors"
                    >
                      {activeCourse.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{activeCourse.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <img src={activeCourse.instructor?.avatar} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-semibold text-slate-300">{activeCourse.instructor?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (activeCourse?.id) {
                          setSelectedCourseId(activeCourse.id);
                          setCurrentView('course-detail');
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 rounded-xl font-bold transition-all"
                    >
                      مشاهده جزئیات دوره
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl shrink-0">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">پلیر هوشمند استریم</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">واترمارک امنیتی و سرعت متغیر</p>
            </div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">صدور گواهینامه معتبر</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">کد استعلام اختصاصی و فایل PDF</p>
            </div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">سورس‌کدهای پروژه‌ای</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">دانلود تمام فایلهای تمرین و کدها</p>
            </div>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">پشتیبانی دائمی مدرسین</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">بخش پرسش و پاسخ تخصصی</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">دوره‌های رایگان</h2>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                ۱۰۰٪ رایگان
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">آموزش‌های با کیفیت و کاملا رایگان برای شروع بدون ریسک کدنویسی</p>
          </div>

          <button
            onClick={() => {
              setCoursePriceType('free');
              setSelectedCategory('all');
              setCurrentView('courses');
            }}
            className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
          >
            مشاهده سایر دوره‌های رایگان
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Free Courses Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {courses
            .filter(c => c.price === 0)
            .slice(0, 4)
            .map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setCoursePriceType('free');
              setSelectedCategory('all');
              setCurrentView('courses');
            }}
            className="px-6 py-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-bold rounded-2xl text-xs transition-all inline-flex items-center gap-2"
          >
            مشاهده سایر دوره‌های رایگان ({courses.filter(c => c.price === 0).length} دوره رایگان)
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* PAID COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">دوره‌های پولی و تخصصی</h2>
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-full">
                تخصصی & پروژه‌محور
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">دوره‌های جامع و حرفه‌ای همراه با پشتیبانی مدرس و گواهینامه معتبر</p>
          </div>

          <button
            onClick={() => {
              setCoursePriceType('paid');
              setSelectedCategory('all');
              setCurrentView('courses');
            }}
            className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
          >
            مشاهده سایر دوره‌های پولی
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Paid Courses Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {courses
            .filter(c => c.price > 0)
            .slice(0, 4)
            .map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setCoursePriceType('paid');
              setSelectedCategory('all');
              setCurrentView('courses');
            }}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-2xl text-xs transition-colors inline-flex items-center gap-2"
          >
            مشاهده سایر دوره‌های پولی ({courses.filter(c => c.price > 0).length} دوره پولی)
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* LEARNING PATHS CAROUSEL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg inline-block mb-1">
                مسیرهای شغلی هدفمند
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">نمی‌دانید از کجا شروع کنید؟</h2>
              <p className="text-xs text-slate-300">نقشه‌های راه شغلی ما شما را قدم به قدم از سطح صفر تا استخدام هدایت می‌کنند.</p>
            </div>
            <button
              onClick={() => setCurrentView('paths')}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs transition-colors shrink-0"
            >
              مشاهده تمام مسیرهای شغلی
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {mockLearningPaths.map(path => (
              <div key={path.id} className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-300">{path.badge}</span>
                  <span className="text-slate-400 font-mono">{path.totalHours} ساعت</span>
                </div>
                <h3 className="text-sm font-bold text-white">{path.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP INSTRUCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-black text-white">مدرسین برتر پلتفرم</h2>
          <p className="text-xs text-slate-400">توسط اساتید و مهندسین مطرح برنامه‌نویسی و هوش مصنوعی آموزش ببینید</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mockInstructors.map(inst => (
            <div key={inst.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3 hover:border-indigo-500/30 transition-colors">
              <img
                src={inst.avatar}
                alt={inst.name}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500/30"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{inst.name}</h3>
                <p className="text-[11px] text-indigo-400 mt-0.5">{inst.roleTitle}</p>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{inst.bio}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-xs text-slate-400">
                <span>⭐ {inst.rating}</span>
                <span>{inst.studentsCount.toLocaleString('fa-IR')} دانشجو</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST BLOG POSTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-black text-white">جدیدترین مقالات مجله مکتب‌کد</h2>
            <p className="text-xs text-slate-400">اخبار تکنولوژی و راهنماهای بازار کار برنامه‌نویسی</p>
          </div>
          <button
            onClick={() => {
              setSelectedBlogId(null);
              setCurrentView('blog');
            }}
            className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
          >
            مشاهده وبلاگ
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-6">
          {mockBlogPosts.slice(0, 4).map(post => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedBlogId(post.id);
                setCurrentView('blog');
              }}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center cursor-pointer group transition-colors"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full sm:w-36 h-24 sm:h-28 rounded-xl object-cover shrink-0"
              />
              <div className="space-y-2 text-right">
                <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-[10px] text-slate-500 block">{post.date} • {post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
