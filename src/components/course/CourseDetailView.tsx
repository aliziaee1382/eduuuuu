import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PlayCircle, 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle2, 
  FileCode2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  Download,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { formatToman } from '../../lib/utils';

export const CourseDetailView: React.FC = () => {
  const { 
    selectedCourseId, 
    courses, 
    setCurrentView, 
    setSelectedLessonId, 
    addToCart, 
    cartCourseIds, 
    enrolledCourseIds, 
    enrollInCourse,
    questions,
    addQuestion
  } = useApp();

  const [activeTab, setActiveTab] = useState<'syllabus' | 'desc' | 'instructor' | 'reviews' | 'qa'>('syllabus');
  const [openModuleId, setOpenModuleId] = useState<string>('mod-1');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewLessonUrl, setPreviewLessonUrl] = useState<string>('');
  const [previewVideoError, setPreviewVideoError] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8 text-center">
        <p className="text-slate-400 font-bold">دوره مورد نظر یافت نشد.</p>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const isInCart = cartCourseIds.includes(course.id);

  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('player');
  };

  const handleOpenPreview = (videoUrl?: string) => {
    setPreviewVideoError(false);
    setPreviewLessonUrl(videoUrl || course.previewVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    setIsPreviewModalOpen(true);
  };

  const courseQuestions = questions.filter(q => q.courseId === course.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Top Breadcrumb & Return */}
      <div className="bg-slate-900 border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentView('courses')} className="hover:text-indigo-400">
              لیست دوره‌ها
            </button>
            <span>/</span>
            <span className="text-slate-300 font-semibold truncate max-w-xs">{course.title}</span>
          </div>
          <button
            onClick={() => setCurrentView('courses')}
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به دوره‌ها
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 cols: Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg">
                  {course.categoryLabel}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg">
                  سطح: {course.level}
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium rounded-lg">
                  آخرین بروزرسانی: {course.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Course Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-500 font-normal">({course.ratingCount} نظر)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{course.studentsCount.toLocaleString('fa-IR')} دانشجو</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{course.durationHours} ساعت آموزش</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>صدور گواهینامه</span>
                </div>
              </div>

              {/* Instructor card preview */}
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-800 w-fit">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[11px] text-slate-400 block">مدرس دوره:</span>
                  <span className="text-xs font-bold text-white">{course.instructor.name}</span>
                  <span className="text-[10px] text-indigo-300 block">{course.instructor.roleTitle}</span>
                </div>
              </div>

            </div>

            {/* Right Sticky Purchase / Video Preview Box */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5 sticky top-24">
                
                {/* Thumbnail with play trigger */}
                <div
                  onClick={() => handleOpenPreview()}
                  className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-slate-950 border border-slate-800"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 bg-slate-950/80 text-slate-200 text-[10px] px-2 py-1 rounded-md backdrop-blur-md">
                    مشاهده ویدیو پیش‌نمایش رایگان
                  </span>
                </div>

                {/* Pricing Details */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">قیمت دوره:</span>
                    {course.discountPrice ? (
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 line-through">
                            {course.price.toLocaleString('fa-IR')}
                          </span>
                          <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded">
                            ٪{course.discountPercent} تخفیف
                          </span>
                        </div>
                        <span className="text-2xl font-black text-indigo-400 block mt-0.5">
                          {formatToman(course.discountPrice)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-black text-indigo-400">
                        {formatToman(course.price)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  {isEnrolled ? (
                    <button
                      onClick={() => {
                        const firstLessonId = course.modules[0]?.lessons[0]?.id || 'les-py-1';
                        handleStartLesson(firstLessonId);
                      }}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
                    >
                      <PlayCircle className="w-5 h-5" />
                      ورود به پلیر و یادگیری دوره
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          enrollInCourse(course.id);
                          const firstLessonId = course.modules[0]?.lessons[0]?.id || 'les-py-1';
                          handleStartLesson(firstLessonId);
                        }}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm"
                      >
                        خرید مستقیم و شروع یادگیری
                      </button>
                      <button
                        onClick={() => addToCart(course.id)}
                        disabled={isInCart}
                        className={`w-full py-3 rounded-2xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 border ${
                          isInCart
                            ? 'bg-slate-800 text-indigo-300 border-indigo-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {isInCart ? 'در سبد خرید شما موجود است' : 'افزودن به سبد خرید'}
                      </button>
                    </div>
                  )}

                  {/* Trust features */}
                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>دسترسی دائمی و مادام‌العمر به محتوا</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-400" />
                      <span>فایل‌ها و سورس‌کدهای پروژه ضمیمه شده</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>صدور گواهینامه الکترونیکی قابل استعلام</span>
                    </p>
                  </div>
                </div>

                {/* Bundle Discount Banner */}
                <div className="p-3 bg-gradient-to-r from-indigo-950 to-slate-900 rounded-2xl border border-indigo-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>پیشنهاد پکیج ویژه:</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    خرید همزمان این دوره با مسیر شغلی فول‌استک شامل ۳۰٪ تخفیف اضافه بر روی کل سبد خرید می‌شود.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Course Detail Tabs & Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Navigation Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
              {[
                { id: 'syllabus', label: 'سرفصل‌های آموزشی' },
                { id: 'desc', label: 'توضیحات و پیشنیازها' },
                { id: 'instructor', label: 'مدرس دوره' },
                { id: 'reviews', label: `نظرات (${course.reviews.length})` },
                { id: 'qa', label: `پرسش و پاسخ (${courseQuestions.length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 text-xs md:text-sm font-bold whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: SYLLABUS Accordion */}
            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>تعداد کل فصول: {course.modules.length} فصل</span>
                  <span>مجموع جلسات: {course.lessonsCount} جلسه</span>
                </div>

                <div className="space-y-3">
                  {course.modules.map(mod => {
                    const isOpen = openModuleId === mod.id;
                    return (
                      <div
                        key={mod.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenModuleId(isOpen ? '' : mod.id)}
                          className="w-full p-4 flex items-center justify-between text-right bg-slate-900/80 hover:bg-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/20">
                              {mod.lessons.length}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-white">{mod.title}</h3>
                          </div>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>

                        {isOpen && (
                          <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 space-y-2">
                            {mod.lessons.map((les, idx) => (
                              <div
                                key={les.id}
                                className="p-3 bg-slate-900/60 border border-slate-800/60 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors text-xs"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg">
                                    <PlayCircle className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="font-semibold text-slate-200 block truncate">{les.title}</span>
                                    <span className="text-[10px] text-slate-400 block">{les.summary}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 mr-2">
                                  {les.attachments && les.attachments.length > 0 && (
                                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                                      <FileCode2 className="w-3 h-3" />
                                      سورس کد
                                    </span>
                                  )}
                                  <span className="text-[11px] font-mono text-slate-400">{les.duration}</span>

                                  {les.isFreePreview ? (
                                    <button
                                      onClick={() => handleOpenPreview(les.videoUrl)}
                                      className="px-2.5 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white rounded-lg text-[10px] font-bold transition-colors"
                                    >
                                      پیش‌نمایش رایگان
                                    </button>
                                  ) : isEnrolled ? (
                                    <button
                                      onClick={() => handleStartLesson(les.id)}
                                      className="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white rounded-lg text-[10px] font-bold transition-colors"
                                    >
                                      پخش جلسه
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-slate-500">قفل شده</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: DESCRIPTION */}
            {activeTab === 'desc' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    دستاوردها و خروجی شما از این دوره
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    {course.learningOutcomes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs leading-relaxed text-slate-300">
                  <h3 className="text-base font-bold text-white mb-2">توضیحات کامل دوره</h3>
                  <p>{course.fullDescription}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <h3 className="text-sm font-bold text-white">پیش‌نیازهای ورود به دوره</h3>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {course.prerequisites.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: INSTRUCTOR */}
            {activeTab === 'instructor' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/30"
                  />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">{course.instructor.name}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{course.instructor.roleTitle}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>امتیاز مدرس: ⭐ {course.instructor.rating}</span>
                      <span>دانشجویان: {course.instructor.studentsCount.toLocaleString('fa-IR')}</span>
                      <span>دوره‌ها: {course.instructor.coursesCount}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                  {course.instructor.bio}
                </p>
              </div>
            )}

            {/* TAB 4: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-right space-y-1">
                    <span className="text-4xl font-black text-white">{course.rating}</span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 my-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">میانگین امتیاز از مجموع {course.ratingCount} نظر</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>✔ نظرات توسط دانشجویان تایید شده ثبت شده‌اند.</p>
                    <p>✔ با شرکت در دوره می‌توانید نظر و امتیاز خود را ثبت کنید.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {course.reviews.map(rev => (
                    <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-white block">{rev.userName}</span>
                            <span className="text-[10px] text-slate-500 block">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: QA */}
            {activeTab === 'qa' && (
              <div className="space-y-6">
                {/* Ask Question Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    پرسش از مدرس یا پشتیبانی علمی دوره
                  </h3>
                  <textarea
                    rows={3}
                    placeholder="سوال خود درباره سرفصل‌ها یا کدنویسی این دوره را بنویسید..."
                    value={newQuestionText}
                    onChange={e => setNewQuestionText(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (!newQuestionText.trim()) return;
                      addQuestion({
                        lessonId: course.modules[0]?.lessons[0]?.id || 'les-py-1',
                        courseId: course.id,
                        questionText: newQuestionText,
                      });
                      setNewQuestionText('');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    ثبت سوال جدید
                  </button>
                </div>

                {/* List Questions */}
                <div className="space-y-4">
                  {courseQuestions.map(qa => (
                    <div key={qa.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <img src={qa.studentAvatar} alt={qa.studentName} className="w-8 h-8 rounded-full" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-white">{qa.studentName}</span>
                            <span className="text-[10px] text-slate-500">{qa.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">{qa.question}</p>
                        </div>
                      </div>

                      {/* Answers */}
                      {qa.answers.map(ans => (
                        <div key={ans.id} className="mr-6 p-3 bg-indigo-950/40 border-r-2 border-indigo-500 rounded-l-xl text-xs space-y-1">
                          <div className="flex items-center gap-2 text-indigo-300 font-bold">
                            <span>{ans.authorName}</span>
                            <span className="text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-200">
                              مدرس
                            </span>
                          </div>
                          <p className="text-slate-300">{ans.content}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column additional info */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-white">ویژگی‌های متمایز مکتب‌کد</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">واترمارک امنیتی ویدیوها</span>
                    <span className="text-[11px] text-slate-400">محافظت هوشمند از محتوای دوره در پلیر اختصاصی.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">یادداشت‌برداری زمان‌دار</span>
                    <span className="text-[11px] text-slate-400">امکان ثبت یادداشت شخص کنار ویدیو و پرش لحظه‌ای.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Free Video Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-white">پیش‌نمایش رایگان دوره</span>
              <button onClick={() => setIsPreviewModalOpen(false)} className="text-slate-400 hover:text-white">
                بستن ✕
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              {previewVideoError ? (
                <div className="p-6 text-center space-y-3 font-mono text-xs text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right space-y-1">
                    <p className="text-amber-400 font-bold">🎬 پیش‌نمایش متنی/کدی جلسه رایگان:</p>
                    <p className="text-slate-300 font-sans">{course.title} - جلسه معرفی سرفصل‌ها</p>
                    <p className="text-slate-400 text-[11px] font-sans">در این جلسه صفر تا صد مسیر یادگیری و پروژه‌های عملی این دوره به تصویر کشیده شده است.</p>
                  </div>
                  <button
                    onClick={() => setPreviewVideoError(false)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold rounded-xl transition-colors text-xs"
                  >
                    تلاش مجدد پخش ویدیو
                  </button>
                </div>
              ) : (
                <video
                  controls
                  autoPlay
                  onError={() => setPreviewVideoError(true)}
                  crossOrigin="anonymous"
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  <source src={previewLessonUrl} type="video/mp4" />
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                </video>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
