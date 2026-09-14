import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  User, 
  ArrowLeft, 
  RefreshCw, 
  KeyRound, 
  UserPlus, 
  GraduationCap, 
  UserCheck, 
  Sparkles,
  Lock,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithPhone, 
    loginQuick, 
    loginWithCredentials 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'credentials' | 'otp' | 'register'>('credentials');
  
  // Credentials tab state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // OTP tab state
  const [otpStep, setOtpStep] = useState<'phone' | 'code' | 'name'>('phone');
  const [phone, setPhone] = useState('09123456789');
  const [otpCode, setOtpCode] = useState('');
  const [userName, setUserName] = useState('');
  const [timer, setTimer] = useState(120);

  // Register tab state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (otpStep === 'code' && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  if (!isAuthModalOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginWithCredentials(username, password);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setOtpStep('code');
    setTimer(120);
    setOtpCode('1234');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) return;
    setOtpStep('name');
  };

  const handleCompleteOtpProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithPhone(phone, userName || 'دانشجوی جدید مکتب‌کد');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regPhone || regPhone.length < 10) {
      setErrorMsg('شماره همراه معتبر وارد کنید.');
      return;
    }
    loginWithPhone(regPhone, regName || 'دانشجوی مکتب‌کد');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Tabs */}
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-black text-white">ورود و ثبت‌نام در مکتب‌کد</h3>
          <p className="text-xs text-slate-400">
            برای یادگیری و دسترسی به دوره‌ها وارد حساب کاربری خود شوید
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1.5 rounded-2xl mb-6 text-xs font-bold border border-slate-700/60">
          <button
            onClick={() => { setActiveTab('credentials'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'credentials' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ورود با رمز
          </button>
          <button
            onClick={() => { setActiveTab('otp'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'otp' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ورود با پیامک
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'register' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ثبت‌نام جدید
          </button>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: USERNAME & PASSWORD LOGIN */}
        {activeTab === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">نام کاربری یا شماره همراه</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="مثلا: aliziaee1382 یا شماره همراه"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">کلمه عبور</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm mt-2"
            >
              <KeyRound className="w-4 h-4" />
              ورود به حساب کاربری
            </button>
          </form>
        )}

        {/* TAB 2: SMS OTP LOGIN */}
        {activeTab === 'otp' && (
          <div>
            {otpStep === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">شماره همراه جهت دریافت کد</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09123456789"
                    dir="ltr"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-left font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm"
                >
                  <Smartphone className="w-4 h-4" />
                  ارسال کد تایید پیامکی
                </button>
              </form>
            )}

            {otpStep === 'code' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    کد ۴ رقمی ارسال شده به شماره <span className="font-mono text-indigo-400">{phone}</span> را وارد کنید.
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="1 2 3 4"
                  dir="ltr"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-center font-mono text-xl tracking-[0.8em] text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
                <p className="text-[11px] text-slate-500 text-center">
                  کد آزمایشی: <span className="font-mono text-indigo-400">1234</span>
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/25 text-sm"
                >
                  تایید کد و ورود
                </button>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <button
                    type="button"
                    onClick={() => setOtpStep('phone')}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    ویرایش شماره
                  </button>
                  {timer > 0 ? (
                    <span>ارسال مجدد ({timer}s)</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTimer(120)}
                      className="text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      ارسال مجدد کد
                    </button>
                  )}
                </div>
              </form>
            )}

            {otpStep === 'name' && (
              <form onSubmit={handleCompleteOtpProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">نام و نام خانوادگی شما</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="مثلا: رضا محمدی"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/25 text-sm"
                >
                  ورود به حساب مکتب‌کد
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: REGISTER NEW USER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">نام و نام خانوادگی</label>
              <input
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="مثلا: سارا رضایی"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">شماره همراه</label>
              <input
                type="tel"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                placeholder="09123456789"
                dir="ltr"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">کلمه عبور دلخواه</label>
              <input
                type="password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 text-sm mt-2"
            >
              <UserPlus className="w-4 h-4" />
              ثبت‌نام و عضویت در مکتب‌کد
            </button>
          </form>
        )}

        {/* QUICK TEST ACCOUNTS SECTION (ONLY STUDENT AND INSTRUCTOR - ADMIN STRICTLY EXCLUDED FROM GUIDE) */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ورود سریع با اکانت‌های تست (آزمایشی):</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => loginQuick('student')}
              className="p-3 bg-indigo-950/60 hover:bg-indigo-900/90 border border-indigo-500/30 hover:border-indigo-500/60 rounded-2xl text-right transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 group-hover:text-white">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>اکانت دانشجو</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">سامان احمدی</p>
            </button>

            <button
              type="button"
              onClick={() => loginQuick('instructor')}
              className="p-3 bg-emerald-950/60 hover:bg-emerald-900/90 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl text-right transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:text-white">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>اکانت مدرس</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">امیرحسین رضایی</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
