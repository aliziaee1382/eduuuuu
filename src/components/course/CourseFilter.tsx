import React from 'react';
import { useApp } from '../../context/AppContext';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface CourseFilterProps {
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onlyDiscounted: boolean;
  setOnlyDiscounted: (val: boolean) => void;
}

export const CourseFilter: React.FC<CourseFilterProps> = ({
  sortBy,
  setSortBy,
  selectedLevel,
  setSelectedLevel,
  onlyDiscounted,
  setOnlyDiscounted,
}) => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, coursePriceType, setCoursePriceType } = useApp();

  const priceTypes = [
    { id: 'all', label: 'همه دوره‌ها' },
    { id: 'free', label: 'دوره‌های رایگان' },
    { id: 'paid', label: 'دوره‌های پولی' },
  ];

  const categories = [
    { id: 'all', label: 'همه دوره‌ها' },
    { id: 'python', label: 'پایتون' },
    { id: 'javascript', label: 'فرانت‌اند (React)' },
    { id: 'ai', label: 'هوش مصنوعی' },
    { id: 'mobile', label: 'برنامه‌نویسی موبایل' },
    { id: 'backend', label: 'بک‌اند (Node.js)' },
  ];

  const levels = [
    { id: 'all', label: 'همه سطوح' },
    { id: 'مبتدی', label: 'مبتدی (بدون پیشنیاز)' },
    { id: 'متوسط', label: 'متوسط' },
    { id: 'پیشرفته', label: 'پیشرفته' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6 shadow-xl sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span>فیلتر و جستجو</span>
        </div>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setCoursePriceType('all');
            setSelectedLevel('all');
            setSearchQuery('');
            setOnlyDiscounted(false);
          }}
          className="text-[11px] text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          پاکسازی فیلترها
        </button>
      </div>

      {/* Price Type Filter (Free vs Paid) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">نوع دوره (رایگان / پولی)</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {priceTypes.map(pt => (
            <button
              key={pt.id}
              onClick={() => setCoursePriceType(pt.id as 'all' | 'free' | 'paid')}
              className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                coursePriceType === pt.id
                  ? pt.id === 'free' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">جستجوی عنوان یا سرفصل</label>
        <div className="relative">
          <input
            type="text"
            placeholder="مثلا: پایتون، React..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">دسته‌بندی موضوعی</label>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{cat.label}</span>
              {selectedCategory === cat.id && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300">سطح آموزشی</label>
        <div className="space-y-1">
          {levels.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedLevel === lvl.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Only Switch */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">فقط دوره‌های تخفیف‌دار</span>
        <button
          type="button"
          onClick={() => setOnlyDiscounted(!onlyDiscounted)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            onlyDiscounted ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'
          }`}
        >
          <span
            className={`absolute top-1 right-1 w-4 h-4 bg-white rounded-full transition-transform transform ${
              onlyDiscounted ? '-translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Sort Option */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300">مرتب‌سازی بر اساس</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="popular">محبوب‌ترین و پرفروش‌ها</option>
          <option value="newest">جدیدترین دوره‌ها</option>
          <option value="price-asc">ارزان‌ترین قیمت</option>
          <option value="price-desc">گران‌ترین قیمت</option>
          <option value="rating">بالاترین امتیاز</option>
        </select>
      </div>

    </div>
  );
};
