import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, User, UserRole, Note, Certificate, DiscountCode, QuestionAnswer, BlogPost } from '../types';
import { mockCourses, mockInstructors, mockBlogPosts, mockDiscountCodes, mockQuestions } from '../data/mockData';

export type ViewMode = 
  | 'home' 
  | 'courses' 
  | 'course-detail' 
  | 'player' 
  | 'dashboard' 
  | 'instructor-panel' 
  | 'admin-panel' 
  | 'cart' 
  | 'blog' 
  | 'blog-detail' 
  | 'paths' 
  | 'about' 
  | 'contact' 
  | 'faq';

interface AppContextType {
  // Navigation & Routing
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  coursePriceType: 'all' | 'free' | 'paid';
  setCoursePriceType: (type: 'all' | 'free' | 'paid') => void;

  // User & Auth
  currentUser: User;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginQuick: (role: 'student' | 'instructor') => void;
  loginWithCredentials: (username: string, pass: string) => { success: boolean; message: string };
  loginWithPhone: (phone: string, name?: string) => void;
  logout: () => void;

  // Course & Data State
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  enrolledCourseIds: string[];
  enrollInCourse: (courseId: string) => void;
  completedLessonIds: string[];
  toggleLessonCompletion: (lessonId: string) => void;
  
  // Shopping Cart & Promo
  cartCourseIds: string[];
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  appliedDiscount: DiscountCode | null;
  applyDiscountCode: (codeStr: string) => { success: boolean; message: string };

  // Notes
  userNotes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;

  // Certificates
  certificates: Certificate[];
  issueCertificate: (courseId: string) => Certificate;

  // Q&A
  questions: QuestionAnswer[];
  addQuestion: (question: { lessonId: string; courseId: string; questionText: string }) => void;
  addAnswer: (questionId: string, answerText: string) => void;

  // Admin / Instructor Operations
  approveCourse: (courseId: string) => void;
  rejectCourse: (courseId: string) => void;
  addNewCourse: (course: Course) => void;

  // Toast / Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

export const testStudentUser: User = {
  id: 'user-std-1',
  name: 'سامان احمدی',
  phone: '09123456789',
  email: 'saman@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  role: 'student',
  enrolledCourseIds: ['course-python-zero-to-hero'],
  completedLessonIds: ['les-py-1', 'les-py-2'],
  balance: 0,
};

export const testInstructorUser: User = {
  id: 'inst-1',
  name: 'مهندس امیرحسین رضایی',
  phone: '09187654321',
  email: 'rezaei@maktabcode.ir',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'instructor',
  bio: 'ارشد معماری نرم‌افزار و مدرس بین‌المللی پایتون',
  enrolledCourseIds: [],
  completedLessonIds: [],
  balance: 14500000,
};

export const adminUser: User = {
  id: 'usr-admin',
  name: 'علی ضیائی (مدیر ارشد سیستم)',
  phone: '09120000000',
  email: 'aliziaee1382@maktabcode.ir',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
  role: 'admin',
  enrolledCourseIds: [],
  completedLessonIds: [],
  balance: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-python-zero-to-hero');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les-py-1');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [coursePriceType, setCoursePriceType] = useState<'all' | 'free' | 'paid'>('all');

  const [currentUser, setCurrentUser] = useState<User>(testStudentUser);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['course-python-zero-to-hero']);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['les-py-1', 'les-py-2']);

  const [cartCourseIds, setCartCourseIds] = useState<string[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);

  const [userNotes, setUserNotes] = useState<Note[]>([
    {
      id: 'note-1',
      courseId: 'course-python-zero-to-hero',
      lessonId: 'les-py-1',
      lessonTitle: 'جلسه ۱: پایتون چیست؟ چرا پایتون یاد بگیریم؟',
      timestampSeconds: 145,
      timestampLabel: '۰۲:۲۵',
      content: 'نکته مهم: پایتون زبان تفسیرشونده است و کدهای آن به صورت خط به خط توسط مفسر اجرا می‌شوند.',
      createdAt: '۱۴۰۵/۰۵/۱۱',
    }
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 'cert-1',
      code: 'MC-2026-8941',
      studentName: 'سامان احمدی',
      courseId: 'course-python-zero-to-hero',
      courseTitle: 'دوره جامع آموزش پایتون از صفر تا ورود به بازار کار (۱۴۰۵)',
      issueDate: '۱۴۰۵/۰۵/۰۸',
      instructorName: 'مهندس امیرحسین رضایی',
      completionHours: 38,
    }
  ]);

  const [questions, setQuestions] = useState<QuestionAnswer[]>(mockQuestions);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loginQuick = (role: 'student' | 'instructor') => {
    if (role === 'instructor') {
      setCurrentUser(testInstructorUser);
      setUserRole('instructor');
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('instructor-panel');
      showToast('ورود موفق! شما با حساب مدرس (مهندس امیرحسین رضایی) وارد شدید.');
    } else {
      setCurrentUser(testStudentUser);
      setUserRole('student');
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
      showToast('ورود موفق! شما با حساب دانشجو (سامان احمدی) وارد شدید.');
    }
  };

  const loginWithCredentials = (username: string, pass: string): { success: boolean; message: string } => {
    const u = username.trim();
    const p = pass.trim();

    if (!u || !p) {
      return { success: false, message: 'لطفاً نام کاربری و کلمه عبور را وارد نمایید.' };
    }

    // 1. Admin login credentials strictly specified by user:
    // Username: aliziaee1382, Pass: ali13821382ali
    if (u.toLowerCase() === 'aliziaee1382' && p === 'ali13821382ali') {
      setCurrentUser(adminUser);
      setUserRole('admin');
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('admin-panel');
      showToast('ورود موفقیت‌آمیز! مدیر ارشد سیستم (علی ضیائی)');
      return { success: true, message: 'ورود مدیر با موفقیت انجام شد.' };
    }

    // 2. Student test credentials
    if (u === '09123456789' || u.toLowerCase() === 'student' || u.toLowerCase() === 'saman') {
      loginQuick('student');
      return { success: true, message: 'ورود به عنوان دانشجو انجام شد.' };
    }

    // 3. Instructor test credentials
    if (u === '09187654321' || u.toLowerCase() === 'instructor' || u.toLowerCase() === 'rezaei') {
      loginQuick('instructor');
      return { success: true, message: 'ورود به عنوان مدرس انجام شد.' };
    }

    // 4. Custom registration/login fallback
    if (u.length >= 3 && p.length >= 4) {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: u,
        phone: '09120000000',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        role: 'student',
        enrolledCourseIds: [],
        completedLessonIds: [],
      };
      setCurrentUser(newUser);
      setUserRole('student');
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
      showToast(`خوش آمدید، ${u}! حساب کاربری ایجاد شد.`);
      return { success: true, message: 'ورود با موفقیت انجام شد.' };
    }

    return { success: false, message: 'نام کاربری یا کلمه عبور اشتباه است.' };
  };

  const loginWithPhone = (phone: string, name?: string) => {
    const updatedUser: User = {
      ...currentUser,
      phone,
      name: name || currentUser.name || 'کاربر جدید مکتب‌کد',
      role: 'student',
    };
    setCurrentUser(updatedUser);
    setUserRole('student');
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    showToast(`خوش آمدید، ${updatedUser.name}! ورود با موفقیت انجام شد.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(testStudentUser);
    setUserRole('student');
    setCurrentView('home');
    showToast('شما با موفقیت از حساب کاربری خارج شدید.');
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
      showToast('ثبت‌نام شما در دوره با موفقیت انجام شد! می‌توانید یادگیری را شروع کنید.');
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds(prev => {
      const exists = prev.includes(lessonId);
      if (exists) {
        return prev.filter(id => id !== lessonId);
      } else {
        showToast('جلسه به عنوان مشاهده‌شده علامت‌گذاری شد ✔');
        return [...prev, lessonId];
      }
    });
  };

  const addToCart = (courseId: string) => {
    if (enrolledCourseIds.includes(courseId)) {
      showToast('شما قبلاً در این دوره ثبت‌نام کرده‌اید.');
      return;
    }
    if (!cartCourseIds.includes(courseId)) {
      setCartCourseIds(prev => [...prev, courseId]);
      showToast('دوره با موفقیت به سبد خرید اضافه شد.');
    } else {
      showToast('این دوره در سبد خرید شما موجود است.');
    }
  };

  const removeFromCart = (courseId: string) => {
    setCartCourseIds(prev => prev.filter(id => id !== courseId));
    showToast('دوره از سبد خرید حذف شد.');
  };

  const clearCart = () => {
    setCartCourseIds([]);
    setAppliedDiscount(null);
  };

  const applyDiscountCode = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = mockDiscountCodes.find(d => d.code === cleanCode);
    if (found) {
      setAppliedDiscount(found);
      showToast(`کد تخفیف ${found.percent}٪ با موفقیت اعمال شد.`);
      return { success: true, message: `کد تخفیف ${found.percent}٪ اعمال شد.` };
    }
    return { success: false, message: 'کد تخفیف وارد شده معتبر نیست یا منقضی شده است.' };
  };

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: 'امروز',
    };
    setUserNotes(prev => [newNote, ...prev]);
    showToast('یادداشت شما ذخیره شد.');
  };

  const deleteNote = (id: string) => {
    setUserNotes(prev => prev.filter(n => n.id !== id));
    showToast('یادداشت حذف شد.');
  };

  const issueCertificate = (courseId: string): Certificate => {
    const course = courses.find(c => c.id === courseId);
    const existing = certificates.find(c => c.courseId === courseId);
    if (existing) return existing;

    const certCode = `MC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      code: certCode,
      studentName: currentUser.name,
      courseId,
      courseTitle: course ? course.title : 'دوره آموزشی پلتفرم',
      issueDate: '۱۴۰۵/۰۵/۱۲',
      instructorName: course ? course.instructor.name : 'استاد دوره',
      completionHours: course ? course.durationHours : 30,
    };
    setCertificates(prev => [newCert, ...prev]);
    showToast('گواهینامه پایان دوره با موفقیت برای شما صادر شد! 🎉');
    return newCert;
  };

  const addQuestion = ({ lessonId, courseId, questionText }: { lessonId: string; courseId: string; questionText: string }) => {
    const newQA: QuestionAnswer = {
      id: `qa-${Date.now()}`,
      lessonId,
      courseId,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      createdAt: 'همین الان',
      question: questionText,
      answers: [],
    };
    setQuestions(prev => [newQA, ...prev]);
    showToast('سوال شما ثبت شد و به مدرس پیام ارسال گردید.');
  };

  const addAnswer = (questionId: string, answerText: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              {
                id: `ans-${Date.now()}`,
                authorName: userRole === 'instructor' ? 'مدرس دوره' : currentUser.name,
                authorRole: userRole,
                authorAvatar: currentUser.avatar,
                createdAt: 'همین الان',
                content: answerText,
              }
            ]
          };
        }
        return q;
      })
    );
    showToast('پاسخ شما ثبت گردید.');
  };

  const approveCourse = (courseId: string) => {
    setCourses(prev =>
      prev.map(c => (c.id === courseId ? { ...c, status: 'published' } : c))
    );
    showToast('دوره تایید شد و در لیست انتشار قرار گرفت.');
  };

  const rejectCourse = (courseId: string) => {
    setCourses(prev =>
      prev.map(c => (c.id === courseId ? { ...c, status: 'draft' } : c))
    );
    showToast('دوره رد شد.');
  };

  const addNewCourse = (newC: Course) => {
    setCourses(prev => [newC, ...prev]);
    showToast('دوره جدید با موفقیت ثبت شد و برای تایید به مدیر ارسال گردید.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        selectedBlogId,
        setSelectedBlogId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        coursePriceType,
        setCoursePriceType,
        currentUser,
        userRole,
        setUserRole,
        isLoggedIn,
        setIsLoggedIn,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginQuick,
        loginWithCredentials,
        loginWithPhone,
        logout,
        courses,
        setCourses,
        enrolledCourseIds,
        enrollInCourse,
        completedLessonIds,
        toggleLessonCompletion,
        cartCourseIds,
        addToCart,
        removeFromCart,
        clearCart,
        appliedDiscount,
        applyDiscountCode,
        userNotes,
        addNote,
        deleteNote,
        certificates,
        issueCertificate,
        questions,
        addQuestion,
        addAnswer,
        approveCourse,
        rejectCourse,
        addNewCourse,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
