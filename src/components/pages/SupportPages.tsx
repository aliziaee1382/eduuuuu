import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockLearningPaths, mockFaqs } from '../../data/mockData';
import { 
  Code2, 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const LearningPathsView: React.FC = () => {
  const { setSelectedCourseId, setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-2">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">مسیرهای یادگیری و نقشه‌های شغلی</h1>
          <p className="text-xs text-slate-400">مجموعه‌ای از دوره‌های مکمل که شما را برای یک موقعیت شغلی مشخص مانند فول‌استک یا هوش مصنوعی آماده می‌کند.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {mockLearningPaths.map(path => (
            <div key={path.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 hover:border-indigo-500/40 transition-colors shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  {path.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">{path.totalHours} ساعت آموزش</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">{path.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{path.description}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] text-slate-500 block">موقعیت شغلی هدف:</span>
                <span className="font-bold text-emerald-400 block">{path.jobRole}</span>
              </div>

              <button
                onClick={() => {
                  setSelectedCourseId(path.courseIds[0]);
                  setCurrentView('course-detail');
                }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                مشاهده و شروع این مسیر شغلی
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export const AboutView: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-2">
            <Code2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">درباره پلتفرم آموزشی مکتب‌کد</h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">داستان شکل‌گیری، مأموریت و چشم‌انداز ما در جهت ارتقای سطح دانش برنامه‌نویسی در کشور</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">چرا مکتب‌کد؟</h2>
          <p>
            پلتفرم آموزش آنلاین مکتب‌کد با هدف رفع شکاف بین آموزش‌های دانشگاهی و نیازمندی‌های واقعی شرکت‌های نرم‌افزاری ایجاد گردیده است. ما معتقدیم برنامه‌نویسی یک مهارت عملی است که فقط با کدنویسی واقعی، ساخت پروژه‌های استاندارد و پلیر اختصاصی با امکانات تعاملی مانند یادداشت‌برداری زمان‌دار قابل یادگیری است.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto" />
              <h3 className="font-bold text-white">پخش امن ویدیو</h3>
              <p className="text-[11px] text-slate-400">واترمارک هوشمند و کیفیت متغیر استریم</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white">گواهینامه معتبر</h3>
              <p className="text-[11px] text-slate-400">کد استعلام اختصاصی و دانلود PDF</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <PhoneCall className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white">پشتیبانی علمی</h3>
              <p className="text-[11px] text-slate-400">پاسخگویی مستقیم مدرسین به سوالات</p>
            </div>
          </div>
        </div>

        {/* Contact Ways Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-indigo-400" />
              راه‌های ارتباط با ما
            </h2>
            <p className="text-xs text-slate-400">
              برای مشاوره تخصصی، پشتیبانی دوره‌ها یا سوالات قبل از خرید می‌توانید از طریق کانال‌های زیر با ما در ارتباط باشید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Phone */}
            <a
              href="tel:02188990011"
              className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">24/7</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">تماس تلفنی مستقیم</span>
                <span className="text-xs font-bold text-white font-mono dir-ltr inline-block">۰۲۱-۸۸۹۹۰۰۱۱</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/989120000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.232c-6.197 0-11.238 5.041-11.241 11.243 0 1.981.518 3.916 1.502 5.62l-1.597 5.833 5.968-1.566A11.2 11.2 0 0012.046 21.6c6.197 0 11.24-5.042 11.243-11.243.002-3.003-1.164-5.827-3.287-7.95-2.122-2.124-4.944-3.288-7.955-3.288" />
                  </svg>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">واتساپ</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">چت و پشتیبانی واتساپ</span>
                <span className="text-xs font-bold text-white font-mono dir-ltr inline-block">۰۹۱۲۰۰۰۰۰۰۰</span>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/maktabcode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/40 rounded-2xl transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </div>
                <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full font-medium">تلگرام</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">کانال و آی‌دی تلگرام</span>
                <span className="text-xs font-bold text-white font-mono dir-ltr inline-block">@maktabcode</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/maktabcode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-pink-500/40 rounded-2xl transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full font-medium">اینستاگرام</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">پیج اینستاگرام</span>
                <span className="text-xs font-bold text-white font-mono dir-ltr inline-block">@maktabcode</span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white">تماس با پشتیبانی مکتب‌کد</h1>
          <p className="text-xs text-slate-400">پاسخگویی ۲۴ ساعته در روزهای کاری</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 text-xs">
            <h2 className="text-sm font-bold text-white">راه‌های ارتباطی مستقیم</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">تلفن پشتیبانی:</span>
                  <span className="font-bold text-white font-mono text-sm">۰۲۱-۸۸۹۹۰۰۱۱</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">پست الکترونیکی:</span>
                  <span className="font-bold text-white font-mono text-xs">support@maktabcode.ir</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">نشانی آکادمی:</span>
                  <span className="font-bold text-white">تهران، خیابان آزادی، مرکز نوآوری شریف</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-2">
                <span className="text-emerald-400 font-bold block text-sm">پیام شما با موفقیت دریافت شد!</span>
                <p className="text-slate-400">همکاران ما در اسرع وقت با شما تماس خواهند گرفت.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">نام شما</label>
                  <input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">شماره تماس یا ایمیل</label>
                  <input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">متن پیام</label>
                  <textarea rows={4} required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" />
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors">
                  ارسال پیام
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export const FaqView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-2">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">سوالات متداول دانشجویان</h1>
          <p className="text-xs text-slate-400">پاسخ به رایج‌ترین ابهامات درباره ثبت‌نام، ویدیوها و مدرک دوره</p>
        </div>

        <div className="space-y-3">
          {mockFaqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 text-right flex items-center justify-between text-xs font-bold text-white hover:bg-slate-800/60 transition-colors"
              >
                <span>{faq.question}</span>
                {openIdx === idx ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-indigo-400" />}
              </button>
              {openIdx === idx && (
                <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
