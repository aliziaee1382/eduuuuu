import { Course, Instructor, LearningPath, BlogPost, DiscountCode, QuestionAnswer } from '../types';

export const mockInstructors: Instructor[] = [
  {
    id: 'inst-1',
    name: 'مهندس امیرحسین رضایی',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    roleTitle: 'ارشد معماری نرم‌افزار و مدرس بین‌المللی پایتون',
    bio: 'بیش از ۱۰ سال سابقه توسعه سیستم‌های توزیع‌شده و تدریس به بیش از ۱۵,۰۰۰ دانشجوی علاقه‌مند به برنامه‌نویسی.',
    rating: 4.9,
    studentsCount: 18400,
    coursesCount: 6,
  },
  {
    id: 'inst-2',
    name: 'دکتر سارا ابراهیمی',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    roleTitle: 'متخصص هوش مصنوعی و یادگیری ماشین (AI Lead)',
    bio: 'دکترای هوش مصنوعی از دانشگاه شریف، مشاور فنی استارتاپ‌ها و متخصص پایتون و پردازش تصویر.',
    rating: 4.8,
    studentsCount: 12200,
    coursesCount: 4,
  },
  {
    id: 'inst-3',
    name: 'مهندس محمدرضا محمدی',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    roleTitle: 'توسعه‌دهنده ارشد React & TypeScript',
    bio: 'طراح رابط‌های کاربری مدرن، مشاور برنامه‌نویسی وب و مدرس دوره‌های جامع فرانت‌اند.',
    rating: 4.9,
    studentsCount: 21500,
    coursesCount: 5,
  },
];

export const mockCourses: Course[] = [
  {
    id: 'course-git-github-free',
    title: 'دوره رایگان آموزش کاربردی Git و GitHub برای تمام برنامه‌نویسان',
    slug: 'git-github-free',
    category: 'backend',
    categoryLabel: 'ابزارها & Git',
    level: 'مبتدی',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    price: 0,
    rating: 4.9,
    ratingCount: 380,
    studentsCount: 6800,
    durationHours: 8,
    lessonsCount: 12,
    instructor: mockInstructors[0],
    shortDescription: 'آموزش گام به گام سیستم کنترل نسخه Git و مدیریت پروژه‌ها در GitHub، دستورات Commit, Push, Pull و Branching.',
    fullDescription: 'یادگیری Git برای هر برنامه‌نویسی ضروری است. در این دوره کاملا رایگان، شما روش مدیریت نسخه سورس‌کد، کار تیمی و ارسال پروژه به گیت‌هاب را می‌آموزید.',
    prerequisites: ['هیچ پیش‌نیازی لازم نیست'],
    learningOutcomes: [
      'کار با دستورات پایه و پیشرفته Git',
      'مدیریت شاخه‌ها (Branching & Merging)',
      'ارسال و دریافت کد از GitHub',
    ],
    isFeatured: true,
    isNew: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۱۴',
    modules: [
      {
        id: 'mod-git-1',
        title: 'فصل اول: مقدمه بر کنترل نسخه و نصب Git',
        lessons: [
          {
            id: 'les-git-1',
            title: 'جلسه ۱: کنترل نسخه چیست و چرا به Git نیاز داریم؟',
            duration: '۱۰:۱۵',
            durationSeconds: 615,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            summary: 'آشنایی با مفاهیم Repository، Commit و تاریخچه تغییرات کد.',
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-html-css-free',
    title: 'دوره رایگان آموزش الفبای وب: HTML5 و CSS3 پروژه‌محور',
    slug: 'html-css-free',
    category: 'javascript',
    categoryLabel: 'فرانت‌اند',
    level: 'مبتدی',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    price: 0,
    rating: 4.8,
    ratingCount: 520,
    studentsCount: 9400,
    durationHours: 12,
    lessonsCount: 18,
    instructor: mockInstructors[2],
    shortDescription: 'آموزش رایگان ساخت صفحات وب از صفر با HTML5 و استایل‌دهی مدرن با CSS3 و Flexbox.',
    fullDescription: 'شروع نقطه ورود به دنیای وب! ساخت اولین وب‌سایت شخص بدون نیاز به دانش قبلی همراه با تمرین‌های عملی.',
    prerequisites: ['علاقه به طراحی و کدنویسی وب'],
    learningOutcomes: [
      'ساختاربندی صحیح صفحات با تگ‌های HTML5',
      'زیباسازی صفحات با خواص CSS3',
      'طراحی چیدمان با Flexbox',
    ],
    isFeatured: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۱۲',
    modules: [],
    reviews: []
  },
  {
    id: 'course-python-basics-free',
    title: 'دوره رایگان آشنایی با مفاهیم برنامه‌نویسی و تفکر الگوریتمی با پایتون',
    slug: 'python-basics-free',
    category: 'python',
    categoryLabel: 'پایتون',
    level: 'مبتدی',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    price: 0,
    rating: 5.0,
    ratingCount: 610,
    studentsCount: 11200,
    durationHours: 10,
    lessonsCount: 15,
    instructor: mockInstructors[0],
    shortDescription: 'دوره کاملا رایگان برای ورود آسان به دنیای الگوریتم‌ها، متغیرها، شرط‌ها و حلقه‌ها در زبان پایتون.',
    fullDescription: 'این دوره هدیه‌ای است برای تمام کسانی که دوست دارند بدانند آیا برنامه‌نویسی برای آنها مناسب است یا خیر.',
    prerequisites: ['کامپیوتر یا لپ‌تاپ خانگی'],
    learningOutcomes: [
      'درک دقیق تفکر رایانشی و الگوریتم',
      'کار با متغیرها، شرط‌ها و حلقه‌ها در پایتون',
      'حل مسئله‌های منطقی ساده',
    ],
    isFeatured: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۰۱',
    modules: [],
    reviews: []
  },
  {
    id: 'course-vscode-free',
    title: 'دوره رایگان آموزش پیشرفته VS Code و میانبرهای افزایش سرعت کدنویسی',
    slug: 'vscode-free',
    category: 'backend',
    categoryLabel: 'ابزارها & IDE',
    level: 'مبتدی',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    price: 0,
    rating: 4.9,
    ratingCount: 410,
    studentsCount: 8100,
    durationHours: 6,
    lessonsCount: 10,
    instructor: mockInstructors[2],
    shortDescription: 'آموزش سفارشی‌سازی محیط VS Code، افزونه‌های حیاتی فرانت‌اند و بک‌اند و کلیدهای میانبر جادویی.',
    fullDescription: 'ادیتور قدرتمند VS Code ابزار اصلی روزمره میلیون‌ها برنامه‌نویس است. با یادگیری ترفندها و شورت‌کات‌های آن، سرعت کدنویسی خود را دو برابر کنید.',
    prerequisites: ['هیچ پیش‌نیازی لازم نیست'],
    learningOutcomes: [
      'بر پیکربندی و افزونه‌های حیاتی VS Code',
      'استفاده از شورت‌کات‌های کاربردی کیبورد',
      'دیباگ مستقیم کدها داخل ادیتور',
    ],
    isFeatured: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۰۸',
    modules: [],
    reviews: []
  },
  {
    id: 'course-python-zero-to-hero',
    title: 'دوره جامع آموزش پایتون از صفر تا ورود به بازار کار (۱۴۰۵)',
    slug: 'python-zero-to-hero',
    category: 'python',
    categoryLabel: 'پایتون',
    level: 'مبتدی',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    price: 1850000,
    discountPrice: 1290000,
    discountPercent: 30,
    rating: 4.9,
    ratingCount: 420,
    studentsCount: 4520,
    durationHours: 38,
    lessonsCount: 42,
    instructor: mockInstructors[0],
    shortDescription: 'یادگیری کامل زبان پایتون، شی‌گرایی، کار با دیتابیس، ساخت ربات تلگرام و پروژه‌های واقعی بازار کار.',
    fullDescription: 'پایتون محبوب‌ترین زبان برنامه‌نویسی جهان در سال‌های اخیر است. در این دوره شما بدون داشتن هیچ سابقه برنامه‌نویسی قبلی، مفاهیم پایه را فرا گرفته و گام به گام تا ساخت پروژه‌های حرفه‌ای مانند سیستم مدیریت فروشگاه، ساخت API با FastAPI و ربات‌های خودکار پیش می‌روید.',
    prerequisites: ['آشنایی مقدماتی با کامپیوتر و اینترنت', 'علاقه به حل مسئله'],
    learningOutcomes: [
      'تسلط کامل به سنتکس پایتون و ساختارهای داده',
      'برنامه‌نویسی شی‌گرا (OOP) و طراحی تمیز',
      'کار با فایل‌ها، JSON و پایگاه‌داده SQLite/PostgreSQL',
      'توسعه RESTful API با فریم‌ورک FastAPI',
      'طراحی ربات‌های کاربردی تلگرام و وب اسکرپینگ (Web Scraping)',
    ],
    isFeatured: true,
    isBestSeller: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۱۰',
    modules: [
      {
        id: 'mod-1',
        title: 'فصل اول: مقدمه، نصب ابزارها و اولین برنامه',
        lessons: [
          {
            id: 'les-py-1',
            title: 'جلسه ۱: پایتون چیست؟ چرا پایتون یاد بگیریم؟',
            duration: '۱۲:۳۰',
            durationSeconds: 750,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            summary: 'آشنایی با تاریخچه، ویژگی‌ها و بازار کار جهانی و ایران پایتون.',
            attachments: [{ title: 'اسلایدهای معرفی پایتون.pdf', size: '2.4 MB', url: '#', type: 'pdf' }],
            quiz: {
              question: 'کدام یک از جملات زیر درباره پایتون صحیح است؟',
              options: ['پایتون یک زبان کامپایلری سخت است', 'پایتون یک زبان تفسیر شونده و سطح بالا است', 'پایتون فقط برای طراحی وب استفاده می‌شود', 'پایتون نیاز به مدیریت دستی حافظه دارد'],
              correctOptionIndex: 1,
            }
          },
          {
            id: 'les-py-2',
            title: 'جلسه ۲: نصب پایتون و محیط VS Code',
            duration: '۱۸:۴۵',
            durationSeconds: 1125,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            summary: 'راهنمای گام‌به‌گام نصب پایتون نسخه جدید و افزونه‌های ضروری VS Code.',
            attachments: [{ title: 'دستورالعمل نصب پایتون.pdf', size: '1.1 MB', url: '#', type: 'pdf' }],
          },
          {
            id: 'les-py-3',
            title: 'جلسه ۳: متغیرها و انواع داده‌ها (Data Types)',
            duration: '۲۲:۱۵',
            durationSeconds: 1335,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: false,
            summary: 'تعریف متغیر، اعداد، رشته‌ها (Strings)، بولین‌ها و قوانین نام‌گذاری.',
            attachments: [{ title: 'سورس کد جلسه متغیرها.py', size: '4 KB', url: '#', type: 'code' }],
            quiz: {
              question: 'خروجی کد type(3.14) در پایتون چیست؟',
              codeSnippet: 'print(type(3.14))',
              options: ['<class "int">', '<class "float">', '<class "str">', 'Error'],
              correctOptionIndex: 1,
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'فصل دوم: ساختارهای کنترلی و توابع',
        lessons: [
          {
            id: 'les-py-4',
            title: 'جلسه ۴: دستورات شرطی if, elif, else',
            duration: '۲۵:۰۰',
            durationSeconds: 1500,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: false,
            summary: 'تصمیم‌گیری در برنامه‌نویسی و بررسی شرایط مختلف با مثال‌های واقعی.',
            attachments: [{ title: 'پروژه محاسبه معدل.zip', size: '12 KB', url: '#', type: 'zip' }]
          },
          {
            id: 'les-py-5',
            title: 'جلسه ۵: حلقه‌ها (For & While) و تمرین عملی',
            duration: '۳۱:۱۰',
            durationSeconds: 1870,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: false,
            summary: 'تکرار کدها، پیمایش لیست‌ها و حل مسائل الگوریتمی پایتون.',
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'فصل سوم: برنامه‌نویسی شی‌گرا (OOP)',
        lessons: [
          {
            id: 'les-py-6',
            title: 'جلسه ۶: کلاس‌ها، متدها و ویژگی‌ها (Classes & Objects)',
            duration: '۳۵:۲۰',
            durationSeconds: 2120,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            isFreePreview: false,
            summary: 'آشنایی کامل با متد __init__ و تعریف کلاس‌ها در پایتون.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'کیوان شهابی',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        date: '۲ روز پیش',
        comment: 'بهترین دوره پایتونی که تا حالا دیدم! شیوه تدریس استاد رضایی واقعا عالی و بدون اتلاف وقته.',
        verifiedBuyer: true,
      },
      {
        id: 'rev-2',
        userName: 'مینا رحیمی',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        date: 'هفته گذشته',
        comment: 'پشتیبانی عالی و پروژه‌های خیلی کاربردی داره. من الان خودم تونستم اولین ربات تلگرامم رو بسازم.',
        verifiedBuyer: true,
      }
    ]
  },
  {
    id: 'course-react-typescript-mastery',
    title: 'دوره مسترکلاس React 19 + TypeScript و Next.js پیشرفته',
    slug: 'react-typescript-mastery',
    category: 'javascript',
    categoryLabel: 'فرانت‌اند',
    level: 'متوسط',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    price: 2400000,
    discountPrice: 1680000,
    discountPercent: 30,
    rating: 4.9,
    ratingCount: 310,
    studentsCount: 3890,
    durationHours: 45,
    lessonsCount: 54,
    instructor: mockInstructors[2],
    shortDescription: 'آموزش کاملاً پروژه‌محور ری‌اکت ۱۹، تایپ‌اسکریپت، مدیریت استیت با Zustand و طراحی داشبوردهای حرفه‌ای.',
    fullDescription: 'اگر می‌خواهید به عنوان فرانت‌اند دیولپر ارشد در شرکت‌های بزرگ استخدام شوید، این دوره تمام ابزارهای استاندارد صنعت روز مانند React 19، Tailwind CSS v4، TypeScript، Zustand و TanStack Query را به صورت عمیق و عملی آموزش می‌دهد.',
    prerequisites: ['تسلط به HTML, CSS و JavaScript ES6+'],
    learningOutcomes: [
      'توسعه اپلیکیشن‌های پیچیده فرانت‌اند با React 19',
      'تایپ‌دهی پیشرفته و امن با TypeScript',
      'مدیریت استیت مدرن با Zustand و Context API',
      'پیاده‌سازی اتصالات واقعی با REST API و WebSocket',
      'ساخت سیستم احراز هویت و مدیریت دسترسی کاربران',
    ],
    isFeatured: true,
    isBestSeller: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۱۲',
    modules: [
      {
        id: 'mod-react-1',
        title: 'فصل اول: یادآوری مدرن جاوااسکریپت و تایپ‌اسکریپت',
        lessons: [
          {
            id: 'les-react-1',
            title: 'جلسه ۱: معمار تایپ‌اسکریپت در فرانت‌اند',
            duration: '۱۶:۴۰',
            durationSeconds: 1000,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            summary: 'بررسی Generics, Interfaces و Types در ری‌اکت.',
            attachments: [{ title: 'پروژه استارتر تایپ‌اسکریپت.zip', size: '4.5 MB', url: '#', type: 'zip' }]
          },
          {
            id: 'les-react-2',
            title: 'جلسه ۲: اکوسیستم React 19 و کامپوننت‌های مدرن',
            duration: '۲۴:۱۵',
            durationSeconds: 1455,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            summary: 'استفاده از هوک‌های جدید و بهبودهای کارایی React 19.',
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'آرش حسینی',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        date: '۳ روز پیش',
        comment: 'فوق‌العاده جامع! مفاهیم تایپ‌اسکریپت رو جوری توضیح دادن که بالاخره فهمیدم کجای پروژه‌های قبلیم اشتباه می‌کردم.',
        verifiedBuyer: true,
      }
    ]
  },
  {
    id: 'course-ai-data-science',
    title: 'دوره متخصص هوش مصنوعی، یادگیری ماشین و پایتون برای داده',
    slug: 'ai-data-science',
    category: 'ai',
    categoryLabel: 'هوش مصنوعی',
    level: 'پیشرفته',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    price: 3200000,
    discountPrice: 2240000,
    discountPercent: 30,
    rating: 4.8,
    ratingCount: 195,
    studentsCount: 2100,
    durationHours: 52,
    lessonsCount: 60,
    instructor: mockInstructors[1],
    shortDescription: 'آموزش عمیق کتابخانه‌های NumPy, Pandas, Scikit-Learn و شبکه‌های عصبی PyTorch با پروژه‌های عملی.',
    fullDescription: 'وارد دنیای شگفت‌انگیز هوش مصنوعی شوید! در این دوره پروژه‌محور از تحلیل داده‌های مالی و پزشکی تا ساخت مدل‌های پیش‌بینی و پردازش زبان طبیعی (NLP) را با پایتون فرا خواهید گرفت.',
    prerequisites: ['پایه پایتون و ریاضیات دبیرستان'],
    learningOutcomes: [
      'تحلیل و تجسم داده‌ها با NumPy و Pandas',
      'الگوریتم‌های الگوسازی Machine Learning',
      'طراحی شبکه‌های عصبی عمیق با PyTorch',
      'کار با مدل‌های زبانی بزرگ (LLM) و Gemini API',
    ],
    isFeatured: true,
    isNew: true,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۰۵',
    modules: [
      {
        id: 'mod-ai-1',
        title: 'فصل اول: تحلیل داده با Pandas & NumPy',
        lessons: [
          {
            id: 'les-ai-1',
            title: 'جلسه ۱: مقدمه بر علم داده و ساختارهای آرایه',
            duration: '۲۰:۰۰',
            durationSeconds: 1200,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            isFreePreview: true,
            summary: 'کار با ماتریس‌ها و بهبود ۵۰ برابری سرعت محاسبات با NumPy.',
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: 'course-flutter-mobile-app',
    title: 'دوره جامع ساخت اپلیکیشن‌های موبایل با Flutter & Dart',
    slug: 'flutter-mobile-app',
    category: 'mobile',
    categoryLabel: 'موبایل',
    level: 'متوسط',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2015.mp4',
    price: 1950000,
    discountPrice: 1450000,
    discountPercent: 25,
    rating: 4.7,
    ratingCount: 154,
    studentsCount: 1820,
    durationHours: 32,
    lessonsCount: 38,
    instructor: mockInstructors[0],
    shortDescription: 'ساخت اپلیکیشن‌های کراس‌پلتفرم برای اندروید و iOS با یک‌بار کدنویسی دارت و ویجت‌های بی‌نظیر فلاتر.',
    fullDescription: 'طراحی اپلیکیشن‌های فروشگاهی، چت و خدماتی برای دو پلتفرم اندروید و iOS با فریم‌ورک قدرتمند گوگل (Flutter).',
    prerequisites: ['آشنایی اولیه با برنامه‌نویسی'],
    learningOutcomes: [
      'تاسیس زیربنای زبان Dart',
      'طراحی UI/UX جذاب موبایل با ویجت‌های Flutter',
      'اتصال به سرویس‌های آنلاین و Firebase',
    ],
    isFeatured: false,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۴/۲۰',
    modules: [],
    reviews: []
  },
  {
    id: 'course-node-backend-master',
    title: 'دوره متخصص توسعه بک‌اند با Node.js, Express & MongoDB',
    slug: 'node-backend-master',
    category: 'backend',
    categoryLabel: 'بک‌اند',
    level: 'متوسط',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    price: 2100000,
    discountPrice: 1570000,
    discountPercent: 25,
    rating: 4.9,
    ratingCount: 280,
    studentsCount: 3100,
    durationHours: 40,
    lessonsCount: 48,
    instructor: mockInstructors[2],
    shortDescription: 'معماری سرویس‌های مقیاس‌پذیر، احراز هویت JWT، درگاه‌های پرداخت، Caching با Redis و Docker.',
    fullDescription: 'ساخت سرورها و APIهای پرسرعت با نودجی‌اس. در این دوره تمام مباحث امنیتی، پایگاه‌داده‌ها، فایل‌آپلوودینگ و استقرار روی سرورهای ابری آموزش داده می‌شود.',
    prerequisites: ['جاوااسکریپت مقدماتی'],
    learningOutcomes: [
      'ساخت REST API ایمن با Express',
      'اتصال به MongoDB و مدیریت کوئری‌ها با Mongoose',
      'احراز هویت کاربران با JWT و کوکی‌های ایمن',
      'اتصال به درگاه‌های پرداخت زرین‌پال و شتاب',
    ],
    isFeatured: false,
    status: 'published',
    updatedAt: '۱۴۰۵/۰۵/۰۱',
    modules: [],
    reviews: []
  }
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path-fullstack-dev',
    title: 'مسیر شغلی متخصص برنامه‌نویسی فول‌استک وب (Full-Stack)',
    description: 'نقشه راه جامع برای تبدیل شدن به برنامه‌نویس وب مسلط به فرانت‌اند React و بک‌اند Node.js.',
    iconName: 'Code',
    badge: 'پرتقاضاترین شغل',
    courseIds: ['course-react-typescript-mastery', 'course-node-backend-master'],
    totalHours: 85,
    jobRole: 'توسعه‌دهنده فول‌استک (درآمد متوسط: ۴۵ تا ۸۰ میلیون تومان در ماه)',
  },
  {
    id: 'path-python-ai',
    title: 'مسیر شغلی مهندس هوش مصنوعی و علم داده با پایتون',
    description: 'از برنامه‌نویسی پایه تا آموزش شبکه‌های عصبی عمیق و مدل‌های هوشمند مبتنی بر Gemini.',
    iconName: 'Brain',
    badge: 'آینده‌دارترین حوزه',
    courseIds: ['course-python-zero-to-hero', 'course-ai-data-science'],
    totalHours: 90,
    jobRole: 'مهندس داده و هوش مصنوعی',
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'چگونه در سال ۱۴۰۵ وارد بازار کار برنامه‌نویسی پایتون شویم؟',
    summary: 'راهنمای عملی گام به گام برای برنامه‌نویسان تازه‌کار: از یادگیری اصول اولیه تا ساخت رزومه پرقدرت و موفقیت در مصاحبه کاری.',
    content: `زبان پایتون به دلیل سادگی در یادگیری و قدرت بالا در حوزه‌های متنوع مانند هوش مصنوعی، طراحی وب، اتوماسیون و تحلیل داده‌ها، یکی از پرتقاضاترین زبان‌های جهان است.

در این مقاله، مسیر دقیق ورود به بازار کار پایتون را مرور می‌کنیم:
۱. تسلط بر مفاهیم پایه (متغیرها، توابع، شیءگرایی)
۲. انتخاب تخصص (Django/FastAPI برای وب یا Pandas/PyTorch برای داده و هوش مصنوعی)
۳. ساخت حداقل ۳ پروژه عملی و قرار دادن کدها در GitHub
۴. بهینه‌سازی رزومه و شرکت در مصاحبه‌های شبیه‌سازی شده

با رعایت این مراحل و تمرین مداوم، می‌توانید در کمتر از ۶ ماه به اولین پیشنهاد شغلی خود دست یابید.`,
    author: 'مهندس امیرحسین رضایی',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    category: 'راهنمای بازار کار',
    date: '۵ مرداد ۱۴۰۵',
    readTime: '۸ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    tags: ['پایتون', 'بازار کار', 'رزومه‌نویسی', 'نقشه راه'],
  },
  {
    id: 'post-2',
    title: 'بررسی ویژگی‌های جدید React 19 و نحوه ارتقای پروژه‌ها',
    summary: 'در نسخه جدید ری‌اکت تغییرات بزرگی در نحوه مدیریت فرم‌ها، هوک‌های جدید use و قابلیت‌های کامپایلر صورت گرفته است.',
    content: `تیم ری‌اکت سرانجام نسخه ۱۹ را با تغییراتی بنیادین منتشر کرد. مهم‌ترین قابلیت‌های اضافه شده عبارتند از:

۱. React Compiler: حذف نیاز به useMemo و useCallback دستی در اکثر سناریوها.
۲. Server Actions: ارسال فرم‌ها و اجرای مستقیم کدهای سرور بدون نیاز به نوشتن دستی API Endpoint.
۳. هوک use: امکان خواندن مستقیم Promiseها و Contextها داخل شرط‌ها و حلقه‌ها.
۴. پشتیبانی بهتر از Document Metadata مثل Title و Meta Tags داخل کامپوننت‌ها.

ارتقا به ری‌اکت ۱۹ باعث بهبود چشمگیر سرعت بارگذاری صفحات و ساده‌تر شدن کدنویسی می‌شود.`,
    author: 'مهندس محمدرضا محمدی',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    category: 'فرانت‌اند',
    date: '۲ مرداد ۱۴۰۵',
    readTime: '۶ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    tags: ['React 19', 'فرانت‌اند', 'جاوااسکریپت'],
  },
  {
    id: 'post-3',
    title: '۱۰ ابزار هوش مصنوعی کاربردی که سرعت کدنویسی شما را ۳ برابر می‌کنند',
    summary: 'معرفی برتریندستیارهای AI از جمله Claude Code، GitHub Copilot، Cursor و Perplexity برای افزایش بازدهی برنامه‌نویسان.',
    content: `هوش مصنوعی جایگزین برنامه‌نویسان نمی‌شود، بلکه برنامه‌نویسانی که از AI استفاده می‌کنند جایگزین افراد سنتی خواهند شد!

برترین ابزارهای AI برای برنامه‌نویسان در سال ۱۴۰۵:
- Cursor IDE: ادیتور هوشمند مبتنی بر VS Code با قدرت Refactor کل پروژه.
- GitHub Copilot Workspace: پیشنهاد هوشمند کد و تولید اتوماتیک Unit Test.
- Claude 3.5 Sonnet: بهترین مدل برای تحلیل معماری و عیب‌یابی کدهای پیچیده.
- v0.dev: ساخت سریع رابط‌های کاربری Tailwind با پرامپت متنی.

استفاده بهینه از این ابزارها می‌تواند روزانه تا ۴ ساعت در وقت شما صرفه‌جویی کند.`,
    author: 'دکتر سارا حسینی',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    category: 'هوش مصنوعی',
    date: '۲۸ تیر ۱۴۰۵',
    readTime: '۷ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    tags: ['هوش مصنوعی', 'Cursor', 'Copilot', 'افزایش بهره‌وری'],
  },
  {
    id: 'post-4',
    title: 'نقشه راه یادگیری توسعه بک‌اند با Node.js و Docker در سال ۱۴۰۵',
    summary: 'توسعه بک‌اند پرسرعت و مدرن با Node.js، Express، PostgreSQL و کانتینرسازی با داکر برای استقرار روی سرویس‌های ابری.',
    content: `توسعه‌دهنده بک‌اند بودن تنها به نوشتن چند API ساده خلاصه نمی‌شود. سیستم‌های امروزی نیازمند پایداری، امنیت بالا و مقیاس‌پذیری هستند.

مراحل اصلی در مسیر یادگیری بک‌اند:
۱. تسلط کامل بر asynchronous programming و Event Loop در Node.js
۲. طراحی پایگاه‌های داده رابطه‌ای (PostgreSQL/MySQL) و NoSQL (MongoDB)
۳. مدیریت امنیت: JWT، Rate Limiting، Hashing کلمه‌های عبور و CORS
۴. کانتینرسازی با Docker و پیکربندی شبکه مایکروسرویس‌ها
۵. مانیتورینگ و لندینگ خطاها با Sentry و Prometheus

با یادگیری این مجموعه مهارت‌ها، رزومه شما در میان انبوه متقاضیان متمایز خواهد شد.`,
    author: 'مهندس نیما کاظمی',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    category: 'پایتون & بک‌اند',
    date: '۲۲ تیر ۱۴۰۵',
    readTime: '۱۰ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
    tags: ['Node.js', 'Docker', 'بک‌اند', 'PostgreSQL'],
  },
  {
    id: 'post-5',
    title: 'مقایسه جامع Flutter و React Native برای ساخت اپلیکیشن‌های موبایل',
    summary: 'کدام فریم‌ورک برای پروژه جدید شما مناسب‌تر است؟ تحلیل کارایی، سرعت توسعه، جامعه کاربری و بازار کار ایران.',
    content: `انتخاب بین Flutter و React Native یکی از دغدغه‌های اصلی برنامه‌نویسان موبایل و مدیران محصول است.

مزایای Flutter:
- گرافیک و رندرینگ فوق‌العاده با موتور Skia/Impeller
- رفتار کاملا یکسان UI در تمام گوشی‌ها
- زبان Dart با قابلیت‌های شیءگرایی قوی و تایپ‌ایمن

مزایای React Native:
- استفاده از اکوسیستم عظیم جاوااسکریپت و ری‌اکت
- حجم اولیه کمتر اپلیکیشن
- قابلیت Fast Refresh عالی برای توسعه سریع

اگر تیم شما قبلا با React کار کرده، React Native انتخاب طبیعی‌تری است؛ اما برای پروژه‌های با UI سنگین و انیمیشن‌های خاص، Flutter عملکرد برتری ارائه می‌دهد.`,
    author: 'مهندس امیرحسین رضایی',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    category: 'توسعه موبایل',
    date: '۱۵ تیر ۱۴۰۵',
    readTime: '۹ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    tags: ['Flutter', 'React Native', 'موبایل', 'اندروید'],
  },
  {
    id: 'post-6',
    title: 'اصول امنیت در وب و جلوگیری از حملات متداول OWASP Top 10',
    summary: 'چگونه وب‌سایت و APIهای خود را در برابر آسیب‌پذیری‌های متداول مانند SQL Injection، XSS و CSRF ایمن کنیم؟',
    content: `امنیت یک فرایند مداوم است نه یک محصول تک‌نوبتی! نادیده گرفتن امنیت می‌تواند خسارات سنگین مالی و اعتباری به بار آورد.

راهکارهای کلیدی ایمن‌سازی:
- همیشه ورودی‌های کاربر را در سمت سرور اعتبارسنجی (Sanitize) کنید.
- از Prepared Statements برای جلوگیری از SQL Injection استفاده نمایید.
- هدرهای امنیتی مثل Content-Security-Policy و Strict-Transport-Security را تنظیم کنید.
- رمزهای عبور را فقط با الگوریتم‌های قدرتمند مثل bcrypt یا Argon2 هش کنید.

رعایت استانداردهای OWASP امنیت پروژه شما را تا ۹۵٪ تضمین خواهد کرد.`,
    author: 'مهندس محمدرضا محمدی',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    category: 'امنیت و دیوآپس',
    date: '۸ تیر ۱۴۰۵',
    readTime: '۱۱ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    tags: ['امنیت', 'OWASP', 'وب', 'تست نفوذ'],
  },
  {
    id: 'post-7',
    title: 'راهنمای جامع طراحی سیستم‌های UI/UX برای توسعه‌دهندگان وب',
    summary: 'آشنایی با اصول تایپوگرافی، فاصله‌گذاری، کنتراست رنگ‌ها و لایه‌بندی تا کدهای شما زیباترین ظاهر ممکن را پیدا کنند.',
    content: `یک برنامه عالی بدون ظاهر کاربرپسند شانس کمی برای موفقیت دارد. برنامه‌نویسان با یادگیری اصول اولیه UX می‌توانند محصولات باکیفیت‌تری تولید کنند.

نکات طلایی طراحی UI:
۱. رعایت سیستم شبکه‌ای (Grid System) و فاصله‌گذاری‌های ۴ و ۸ پیکسلی
۲. ایجاد تضاد (Contrast) کافی برای خوانایی بهتر متن‌ها
۳. استفاده محدود از رنگ‌ها (قانون ۶۰-۳۰-۱۰)
۴. ارائه بازخورد فوری به رفتارهای کاربر (Loading، Hover، Toast Alerts)

با اعمال این نکات ساده، تجربه کاربری محصول شما تحول چشمگیری خواهد داشت.`,
    author: 'دکتر سارا حسینی',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    category: 'طراحی UI/UX',
    date: '۱ تیر ۱۴۰۵',
    readTime: '۵ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    tags: ['UI/UX', 'طراحی وب', 'فرانت‌اند', 'تجربه کاربری'],
  }
];

export const mockDiscountCodes: DiscountCode[] = [
  { code: 'NOROOZ1405', percent: 20, description: 'کد تخفیف ویژه ۲۰٪ جشنواره', expiryDate: '۱۴۰۵/۰۶/۰۱' },
  { code: 'MAKTEB30', percent: 30, description: 'تخفیف ویژه ثبت‌نام اول', expiryDate: '۱۴۰۵/۰۸/۱۵' },
];

export const mockQuestions: QuestionAnswer[] = [
  {
    id: 'qa-1',
    lessonId: 'les-py-3',
    courseId: 'course-python-zero-to-hero',
    studentName: 'رضا کریمی',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    createdAt: 'دیروز در ساعت ۱۴:۲۰',
    question: 'استاد تفاوت اصلی متغیرهای محلی (Local) و عمومی (Global) در پایتون چیه؟ کی باید از کلیدواژه global استفاده کنیم؟',
    answers: [
      {
        id: 'ans-1',
        authorName: 'مهندس امیرحسین رضایی',
        authorRole: 'instructor',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        createdAt: 'دیروز در ساعت ۱۵:۰۵',
        content: 'سلام رضا جان. متغیرهای محلی داخل بلاک تابع تعریف میشن و فقط همونجا قابل دسترسی هستن. اگر بخوای داخل تابع یک متغیر بیرون از تابع رو تغییر بدی، باید از عبارت global variable_name استفاده کنی. البته بهتره تا جای ممکن از تغییر متغیرهای گوناگون عمومی اجتناب کنیم تا کد تمیز بمونه.',
      }
    ]
  }
];

export const mockFaqs = [
  {
    question: 'آیا دسترسی به دوره‌ها محدودیت زمانی دارد؟',
    answer: 'خیر! پس از خرید هر دوره، شما به صورت دائمی و مادام‌العمر به محتوا، ویدیوها و آپدیت‌های آینده آن دوره دسترسی کامل خواهید داشت.'
  },
  {
    question: 'گواهینامه پایان دوره چگونه صادر می‌شود؟',
    answer: 'پس از مشاهده تمام جلسات دوره و کسب امتیاز قبولی در آزمون‌های کوتاه، گواهینامه الکترونیکی معتبر به نام شما با کد استعلام اختصاصی به صورت PDF صادر می‌شود.'
  },
  {
    question: 'چگونه می‌توانم با مدرس دوره در ارتباط باشم؟',
    answer: 'در زیر هر جلسه از دوره، بخش پرسش و پاسخ فعال است. شما می‌توانید سوالات کدی و اشکالات خود را مطرح کنید تا مدرس یا سایر دانشجویان پاسخ دهند.'
  },
  {
    question: 'شیوه پرداخت به چه صورت است؟',
    answer: 'امکان پرداخت آنلاین با تمام کارت‌های عضو شتاب از طریق درگاه‌های امن زرین‌پال و سامان کیش وجود دارد.'
  }
];
