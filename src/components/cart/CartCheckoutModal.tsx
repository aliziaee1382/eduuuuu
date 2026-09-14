import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { formatToman } from '../../lib/utils';

export const CartCheckoutModal: React.FC = () => {
  const { 
    cartCourseIds, 
    courses, 
    removeFromCart, 
    clearCart, 
    appliedDiscount, 
    applyDiscountCode, 
    enrollInCourse,
    setCurrentView,
    setSelectedCourseId,
    setSelectedLessonId,
    showToast 
  } = useApp();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<'zarinpal' | 'saman'>('zarinpal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartCourses = courses.filter(c => cartCourseIds.includes(c.id));

  const subtotalPrice = cartCourses.reduce((acc, c) => acc + (c.discountPrice || c.price), 0);
  const discountAmount = appliedDiscount ? Math.round((subtotalPrice * appliedDiscount.percent) / 100) : 0;
  const finalPrice = Math.max(0, subtotalPrice - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput) return;
    applyDiscountCode(promoCodeInput);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Enroll student into all courses in cart
      cartCourses.forEach(c => enrollInCourse(c.id));
      clearCart();
      showToast('پرداخت با موفقیت انجام شد! دوره‌ها به پنل کاربری شما اضافه گردید.');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-white">پرداخت موفقیت‌آمیز بود!</h2>
            <p className="text-xs text-slate-400">کد پیگیری تراکنش: <span className="font-mono text-emerald-400 font-bold">TRX-{Math.floor(100000 + Math.random() * 900000)}</span></p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ثبت‌نام شما در دوره‌ها با موفقیت ثبت شد. می‌توانید همین الان دیدن ویدیوها را شروع کنید.
          </p>
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                if (cartCourses.length > 0) {
                  setSelectedCourseId(cartCourses[0].id);
                  const firstLesson = cartCourses[0].modules[0]?.lessons[0]?.id || 'les-py-1';
                  setSelectedLessonId(firstLesson);
                  setCurrentView('player');
                } else {
                  setCurrentView('dashboard');
                }
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-colors text-xs"
            >
              ورود به پلیر و پخش اولین جلسه
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-semibold"
            >
              مشاهده در پنل کاربری
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-black text-white">سبد خرید و تسویه‌حساب</h1>
          </div>
          <button
            onClick={() => setCurrentView('courses')}
            className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4" />
            ادامه مرور دوره‌ها
          </button>
        </div>

        {cartCourses.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
            <h2 className="text-base font-bold text-white">سبد خرید شما خالی است.</h2>
            <p className="text-xs text-slate-400">می‌توانید دوره‌های آموزشی مورد علاقه خود را انتخاب کرده و به سبد خرید اضافه کنید.</p>
            <button
              onClick={() => setCurrentView('courses')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              مشاهده لیست دوره‌ها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 cols: Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartCourses.map(course => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-14 rounded-xl object-cover" />
                    <div className="space-y-1">
                      <span className="text-[10px] text-indigo-400 font-semibold">{course.categoryLabel}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-white">{course.title}</h3>
                      <p className="text-[11px] text-slate-400">مدرس: {course.instructor.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-indigo-300">
                      {formatToman(course.discountPrice || course.price)}
                    </span>
                    <button
                      onClick={() => removeFromCart(course.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Col: Price Summary & Gateway Selection */}
            <div className="space-y-6">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  کد تخفیف دارید؟
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="کد تخفیف (مثلا: NOROOZ1405)"
                    value={promoCodeInput}
                    onChange={e => setPromoCodeInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-xl font-bold transition-colors"
                  >
                    اعمال
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-[11px] text-emerald-400 font-bold">
                    کد تخفیف {appliedDiscount.percent}٪ فعال شد ({appliedDiscount.code})
                  </p>
                )}
              </form>

              {/* Payment Gateway */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
                <span className="font-bold text-white block">انتخاب درگاه پرداخت امن:</span>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGateway('zarinpal')}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedGateway === 'zarinpal' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                        ZP
                      </div>
                      <span className="font-bold">درگاه رسمی زرین‌پال (تمام کارت‌های شتاب)</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedGateway('saman')}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedGateway === 'saman' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-400" />
                      <span className="font-bold">درگاه بانک سامان (کارت‌های عضو شتاب)</span>
                    </div>
                  </button>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>مجموع قیمت:</span>
                    <span>{formatToman(subtotalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>تخفیف اعمال شده:</span>
                      <span>- {formatToman(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-slate-800">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-indigo-400">{formatToman(finalPrice)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing ? 'در حال اتصال به درگاه پرداخت...' : 'تایید و پرداخت آنلاین'}
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
