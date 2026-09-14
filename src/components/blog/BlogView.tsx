import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockBlogPosts } from '../../data/mockData';
import { 
  Newspaper, 
  Clock, 
  ArrowRight, 
  User, 
  Tag, 
  Search, 
  Filter, 
  X, 
  FolderOpen, 
  Sparkles,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogView: React.FC = () => {
  const { selectedBlogId, setSelectedBlogId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const activePost = mockBlogPosts.find(p => p.id === selectedBlogId) || null;

  // Extract unique categories & tags
  const categories = ['all', ...Array.from(new Set(mockBlogPosts.map(p => p.category)))];
  
  const allTags = Array.from(new Set(mockBlogPosts.flatMap(p => p.tags)));

  // Filter posts
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = 
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTag && matchesSearch;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
  };

  const hasActiveFilter = searchQuery !== '' || selectedCategory !== 'all' || selectedTag !== 'all';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl mb-1 border border-indigo-500/20">
            <Newspaper className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">وبلاگ و مجله آموزشی مکتب‌کد</h1>
          <p className="text-xs text-slate-400">آخرین مقالات تکنولوژی، نقشه راه بازار کار و تحلیلی جدیدترین فریم‌ورک‌ها</p>
        </div>

        {activePost ? (
          /* Article Detail View */
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
            <button
              onClick={() => setSelectedBlogId(null)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-bold transition-colors bg-indigo-950/40 border border-indigo-500/20 px-3 py-2 rounded-xl w-fit"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به لیست مقالات وبلاگ
            </button>

            <div className="space-y-4 pt-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-lg inline-block">
                {activePost.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">{activePost.title}</h2>
              
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-y border-slate-800/80 py-3">
                <div className="flex items-center gap-2">
                  <img src={activePost.authorAvatar} alt={activePost.author} className="w-7 h-7 rounded-full object-cover border border-indigo-500/30" />
                  <span className="font-semibold text-slate-200">{activePost.author}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {activePost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {activePost.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 pt-2">
              <p className="font-bold text-white text-sm sm:text-base leading-relaxed bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                {activePost.summary}
              </p>
              <div className="whitespace-pre-line text-slate-300 leading-relaxed font-sans space-y-3">
                {activePost.content}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1 ml-2">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                برچسب‌ها:
              </span>
              {activePost.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-700/60">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* Articles List View with Right Sidebar Filters & 3-Column Grid */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* RIGHT SIDEBAR: FILTERS & CATEGORIES (Positioned on the right in RTL) */}
            <div className="lg:col-span-1 space-y-6 order-first lg:order-first">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-6 sticky top-24 shadow-xl">
                
                {/* Search Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-indigo-400" />
                      جستجو در مقالات
                    </span>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="عنوان مقاله، کلیدواژه..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {searchQuery ? (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute left-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    )}
                  </div>
                </div>

                {/* Categories List */}
                <div className="space-y-2.5 border-t border-slate-800/80 pt-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4 text-emerald-400" />
                    دسته بندی موضوعی
                  </span>
                  <div className="space-y-1">
                    {categories.map(cat => {
                      const count = cat === 'all' 
                        ? mockBlogPosts.length 
                        : mockBlogPosts.filter(p => p.category === cat).length;
                      
                      const label = cat === 'all' ? 'همه مقالات' : cat;
                      const isSelected = selectedCategory === cat;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-right px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>{label}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-950 text-slate-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags Cloud */}
                <div className="space-y-2.5 border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-amber-400" />
                      برچسب‌های داغ
                    </span>
                    {selectedTag !== 'all' && (
                      <button
                        onClick={() => setSelectedTag('all')}
                        className="text-[10px] text-indigo-400 hover:underline"
                      >
                        همه
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map(tag => {
                      const isSelected = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(isSelected ? 'all' : tag)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          #{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear All Filters Button */}
                {hasActiveFilter && (
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/20 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    پاکسازی تمام فیلترها
                  </button>
                )}

              </div>
            </div>

            {/* MAIN CONTENT AREA: ARTICLES GRID (3 ITEMS PER ROW) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Active Filter Bar Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 px-5 py-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>
                    {selectedCategory === 'all' ? 'همه مقالات' : selectedCategory}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    ({filteredPosts.length} مقاله یافته شد)
                  </span>
                </div>

                {hasActiveFilter && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">فیلتر فعال:</span>
                    {selectedCategory !== 'all' && (
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                        دسته: {selectedCategory}
                      </span>
                    )}
                    {selectedTag !== 'all' && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                        برچسب: {selectedTag}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                        عبارت: "{searchQuery}"
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Articles Grid - 2 COLUMNS ON MOBILE, 3 COLUMNS ON DESKTOP */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                  {filteredPosts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedBlogId(post.id)}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-indigo-500/10 p-3 sm:p-5 space-y-2.5 sm:space-y-4 cursor-pointer group transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2 sm:space-y-3">
                        {/* Article Image & Category Badge */}
                        <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-800/80">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-slate-950/85 text-indigo-300 border border-indigo-500/30 text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg backdrop-blur-md">
                            {post.category}
                          </span>
                        </div>

                        {/* Article Title & Summary */}
                        <div className="space-y-1">
                          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                            {post.summary}
                          </p>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80 mt-1">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                          <div className="flex items-center gap-1 truncate max-w-[60%]">
                            <img src={post.authorAvatar} alt={post.author} className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0" />
                            <span className="truncate">{post.author}</span>
                          </div>
                          <span className="flex items-center gap-1 text-slate-500 shrink-0 font-medium text-[9px] sm:text-[11px]">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
                  <div className="inline-flex p-4 bg-slate-800 text-slate-400 rounded-2xl">
                    <FolderOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-white">هیچ مقاله‌ای با مشخصات انتخابی یافت نشد</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    لطفا عبارت دیگری را جستجو کنید یا فیلترهای اعمال شده را پاکسازی نمایید.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    نمایش تمام مقالات
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
