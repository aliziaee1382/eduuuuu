import React from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, Phone, Mail, MapPin, ShieldCheck, Heart, Github, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedBlogId } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-indigo-400">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                مکتب‌<span className="text-indigo-400">کد</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              آکادمی آنلاین آموزش برنامه‌نویسی مکتب‌کد با هدف تربیت نیروهای کارآمد و متخصص برای بازار کار داخلی و بین‌المللی با ارائه‌ی دوره‌های کاملاً پروژه‌محور و ویدیوپلیر اختصاصی پیشرفته فعالیت می‌کند.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-800 rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-800 rounded-xl transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-900 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-800 rounded-xl transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links & Categories - Side by Side on Mobile */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2">
            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setCurrentView('courses')} className="hover:text-indigo-400 transition-colors">
                    دوره‌های آموزشی
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('paths')} className="hover:text-indigo-400 transition-colors">
                    مسیرهای یادگیری
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedBlogId(null); setCurrentView('blog'); }} className="hover:text-indigo-400 transition-colors">
                    وبلاگ و مقالات
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('about')} className="hover:text-indigo-400 transition-colors">
                    درباره مکتب‌کد
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('contact')} className="hover:text-indigo-400 transition-colors">
                    تماس با پشتیبانی
                  </button>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">دسته‌بندی‌ها</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => { setSelectedCategory('python'); setCurrentView('courses'); }} className="hover:text-indigo-400 transition-colors">
                    آموزش پایتون
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('javascript'); setCurrentView('courses'); }} className="hover:text-indigo-400 transition-colors">
                    فرانت‌اند و React
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('ai'); setCurrentView('courses'); }} className="hover:text-indigo-400 transition-colors">
                    هوش مصنوعی و داده
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('mobile'); setCurrentView('courses'); }} className="hover:text-indigo-400 transition-colors">
                    برنامه‌نویسی موبایل
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('backend'); setCurrentView('courses'); }} className="hover:text-indigo-400 transition-colors">
                    بک‌اند و دیتابیس
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Trust Badges & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">نمادهای اعتماد</h4>
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-7 h-7 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-300 font-semibold">اینماد الکترونیکی</span>
              </div>
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs mb-1">
                  ZP
                </div>
                <span className="text-[10px] text-slate-300 font-semibold">درگاه پرداخت امن</span>
              </div>
            </div>
            <div className="text-xs space-y-1 pt-1 text-slate-400">
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-400" /> ۰۲۱-۸۸۹۹۰۰۱۱</p>
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-400" /> support@maktabcode.ir</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ۱۴۰۵ تمامی حقوق مادی و معنوی برای پلتفرم مکتب‌کد محفوظ است.</p>
          <div>
            طراحی و توسعه توسط{' '}
            <a
              href="https://ali0003.ir"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="inline-block font-sans text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline underline-offset-4"
            >
              0003
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
