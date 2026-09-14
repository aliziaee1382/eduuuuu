import React, { useState } from 'react';
import { useApp, ViewMode } from '../../context/AppContext';
import { 
  Code2, 
  Search, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  BookOpen, 
  Compass, 
  Newspaper, 
  ChevronDown,
  Info,
  SlidersHorizontal,
  Sparkles,
  LogOut,
  LogIn,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    searchQuery, 
    setSearchQuery, 
    cartCourseIds, 
    setIsAuthModalOpen, 
    userRole, 
    currentUser,
    isLoggedIn,
    logout,
    setSelectedCategory,
    coursePriceType,
    setCoursePriceType,
    setSelectedBlogId
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    if (view === 'blog') {
      setSelectedBlogId(null);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        {/* Top Banner Notice */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 py-1.5 px-4 text-center text-xs text-indigo-300 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>تخفیف ویژه جشنواره تابستانه مکتب‌کد: کد تخفیف <span className="font-mono bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-200 border border-indigo-500/30">NOROOZ1405</span> برای ۲۰٪ تخفیف اضافه!</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 group text-right"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-indigo-400 group-hover:text-cyan-300">
                    <Code2 className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <span className="text-lg md:text-xl font-black tracking-tight text-white block">
                    مکتب‌<span className="text-indigo-400">کد</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1 font-medium">آکادمی برنامه‌نویسی</span>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mr-2">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'home' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  خانه
                </button>
                <button
                  onClick={() => { 
                    setCoursePriceType('free'); 
                    setSelectedCategory('all'); 
                    handleNavClick('courses'); 
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    currentView === 'courses' && coursePriceType === 'free' ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-300/90 hover:text-emerald-200 hover:bg-emerald-500/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  دوره‌های رایگان
                </button>
                <button
                  onClick={() => { 
                    setCoursePriceType('paid'); 
                    setSelectedCategory('all'); 
                    handleNavClick('courses'); 
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'courses' && coursePriceType === 'paid' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  دوره‌های پولی
                </button>
                <button
                  onClick={() => handleNavClick('paths')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'paths' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  مسیرهای یادگیری
                </button>
                <button
                  onClick={() => handleNavClick('blog')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'blog' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  وبلاگ و اخبار
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    currentView === 'about' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  درباره ما
                </button>
              </nav>
            </div>

            {/* Right Tools & Account Actions */}
            <div className="flex items-center gap-2.5 md:gap-3">
              
              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors hidden sm:flex items-center gap-2 border border-slate-800 bg-slate-900/60 text-xs"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 pl-4">جستجوی دوره، تکنولوژی...</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCurrentView('cart')}
                className="relative p-2.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
                title="سبد خرید"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCourseIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">
                    {cartCourseIds.length}
                  </span>
                )}
              </button>

              {/* AUTH SYSTEM: User Profile Menu if Logged in, OR Login/Register Button if Logged out */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="px-2.5 py-1.5 md:px-3 md:py-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover border border-indigo-400/50"
                    />
                    <span className="hidden sm:inline font-bold text-white">{currentUser.name}</span>
                    
                    {/* Role Badge */}
                    {userRole === 'student' && (
                      <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded border border-indigo-500/30">
                        دانشجو
                      </span>
                    )}
                    {userRole === 'instructor' && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded border border-emerald-500/30">
                        مدرس
                      </span>
                    )}
                    {userRole === 'admin' && (
                      <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded border border-rose-500/30">
                        مدیر
                      </span>
                    )}

                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Account Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in text-xs space-y-1">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="font-bold text-white">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{currentUser.email || currentUser.phone}</p>
                      </div>

                      {userRole === 'student' && (
                        <button
                          onClick={() => {
                            setCurrentView('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-2 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                          <span>پنل دانشجو</span>
                        </button>
                      )}

                      {userRole === 'instructor' && (
                        <button
                          onClick={() => {
                            setCurrentView('instructor-panel');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-800 text-emerald-300 transition-colors flex items-center gap-2 font-medium"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>پنل مدرس</span>
                        </button>
                      )}

                      {userRole === 'admin' && (
                        <button
                          onClick={() => {
                            setCurrentView('admin-panel');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-800 text-rose-300 transition-colors flex items-center gap-2 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-rose-400" />
                          <span>پنل مدیریت ارشد</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-rose-500/10 text-rose-400 transition-colors flex items-center gap-2 font-medium border-t border-slate-800/80"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>خروج از حساب کاربری</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>ورود / ثبت‌نام</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white lg:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="جستجوی دوره..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setCurrentView('courses');
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-right py-2 px-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              صفحه اصلی
            </button>
            <button
              onClick={() => {
                setCoursePriceType('free');
                setSelectedCategory('all');
                handleNavClick('courses');
              }}
              className="w-full text-right py-2 px-3 text-sm font-medium text-emerald-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              دوره‌های رایگان
            </button>
            <button
              onClick={() => {
                setCoursePriceType('paid');
                setSelectedCategory('all');
                handleNavClick('courses');
              }}
              className="w-full text-right py-2 px-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              دوره‌های پولی
            </button>
            <button
              onClick={() => handleNavClick('paths')}
              className="w-full text-right py-2 px-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              مسیرهای شغلی
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="w-full text-right py-2 px-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <Newspaper className="w-4 h-4 text-indigo-400" />
              وبلاگ آموزشی
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-right py-2 px-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-indigo-400" />
              درباره ما
            </button>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400">جستجوی هوشمند در مکتب‌کد</span>
              <button onClick={() => setIsSearchModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="عنوان دوره، زبان برنامه‌نویسی یا مدرس..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setCurrentView('courses');
                    setIsSearchModalOpen(false);
                  }
                }}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="text-slate-500 text-[11px] self-center">جستجوهای رایج:</span>
                {['پایتون', 'React', 'هوش مصنوعی', 'Flutter', 'Node.js'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setCurrentView('courses');
                      setIsSearchModalOpen(false);
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 rounded-lg border border-slate-700 text-[11px] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setCurrentView('courses');
                  setIsSearchModalOpen(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
              >
                نمایش نتایج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
