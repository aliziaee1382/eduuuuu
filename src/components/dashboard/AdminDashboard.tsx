import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Tag, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  Plus, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { formatToman } from '../../lib/utils';
import { mockDiscountCodes } from '../../data/mockData';
import { DiscountCode } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { courses, approveCourse, rejectCourse, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'discounts' | 'users' | 'analytics'>('moderation');

  // New Coupon state
  const [coupons, setCoupons] = useState<DiscountCode[]>(mockDiscountCodes);
  const [newCode, setNewCode] = useState('');
  const [newPercent, setNewPercent] = useState('25');
  const [newDesc, setNewDesc] = useState('');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    const created: DiscountCode = {
      code: newCode.toUpperCase(),
      percent: parseInt(newPercent) || 20,
      description: newDesc || 'کد تخفیف اختصاصی مدیریت',
      expiryDate: '۱۴۰۵/۰۹/۰۱',
    };
    setCoupons(prev => [created, ...prev]);
    showToast(`کد تخفیف ${created.code} ایجاد شد.`);
    setNewCode('');
    setNewDesc('');
  };

  const pendingCourses = courses.filter(c => c.status === 'pending');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-right">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
              <h1 className="text-xl sm:text-2xl font-black text-white">پنل مدیریت عالی سیستم (ادمین)</h1>
            </div>
            <p className="text-xs text-slate-400">کنترل کیفیت دوره‌ها، گزارشات مالی، کدهای تخفیف و کاربران پلتفرم</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">فروش کل پلتفرم</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 block mt-1">
                {formatToman(184200000)}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">کل کاربران</span>
              <span className="text-sm sm:text-base font-black text-indigo-400 block mt-1">
                ۱۵,۴۰۰ نفر
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">دوره‌های نیازمند تایید</span>
              <span className="text-sm sm:text-base font-black text-rose-400 block mt-1">
                {pendingCourses.length} دوره
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'moderation' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            بررسی و تایید دوره‌ها ({pendingCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'discounts' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            مدیریت کدهای تخفیف ({coupons.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'users' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            مدیریت کاربران و مدرسین
          </button>
        </div>

        {/* TAB 1: MODERATION */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            {pendingCourses.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-white">تمامی دوره‌ها بررسی و تایید شده‌اند.</h3>
                <p className="text-xs text-slate-400">هیچ دوره‌ای در صف تایید معلق نمانده است.</p>
              </div>
            ) : (
              pendingCourses.map(course => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={course.thumbnail} alt={course.title} className="w-24 h-16 rounded-xl object-cover" />
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                        در انتظار بررسی
                      </span>
                      <h3 className="text-sm font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-slate-400">مدرس: {course.instructor.name} | قیمت: {formatToman(course.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      onClick={() => approveCourse(course.id)}
                      className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      تایید و انتشار دوره
                    </button>
                    <button
                      onClick={() => rejectCourse(course.id)}
                      className="flex-1 md:flex-none px-4 py-2.5 bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-rose-500/30"
                    >
                      <X className="w-4 h-4" />
                      رد دوره
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: DISCOUNTS */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleAddCoupon} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-xl text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-rose-400" />
                ایجاد کد تخفیف جدید
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثلا: NOROOZ1405)"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono uppercase"
                  required
                />
                <input
                  type="number"
                  placeholder="درصد تخفیف (مثلا: 30)"
                  value={newPercent}
                  onChange={e => setNewPercent(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="توضیحات یا عنوان کمپین..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              />
              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors"
              >
                ذخیره و فعال‌سازی کد تخفیف
              </button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded border border-indigo-500/30 text-sm">
                      {c.code}
                    </span>
                    <span className="font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                      ٪{c.percent} تخفیف
                    </span>
                  </div>
                  <p className="text-slate-300">{c.description}</p>
                  <p className="text-[10px] text-slate-500">تاریخ انقضا: {c.expiryDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USERS */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">لیست کاربران و دسترسی‌ها</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'سامان احمدی', role: 'دانشجو', phone: '09123456789', status: 'فعال' },
                { name: 'مهندس امیرحسین رضایی', role: 'مدرس', phone: '09129876543', status: 'فعال' },
                { name: 'دکتر سارا ابراهیمی', role: 'مدرس', phone: '09121112233', status: 'فعال' },
              ].map((u, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{u.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{u.phone} ({u.role})</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded font-bold text-[10px]">
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
