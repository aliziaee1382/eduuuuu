export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  balance?: number; // In Tomans
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "14:20"
  durationSeconds: number;
  videoUrl: string; // sample video URL or preview embed
  isFreePreview: boolean;
  summary: string;
  attachments?: { title: string; size: string; url: string; type: 'code' | 'pdf' | 'zip' }[];
  quiz?: {
    question: string;
    options: string[];
    correctOptionIndex: number;
    codeSnippet?: string;
  };
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  roleTitle: string; // e.g. "ارشد برنامه‌نویسی پایتون و هوش مصنوعی"
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface QuestionAnswer {
  id: string;
  lessonId: string;
  courseId: string;
  studentName: string;
  studentAvatar: string;
  createdAt: string;
  question: string;
  answers: {
    id: string;
    authorName: string;
    authorRole: 'instructor' | 'student' | 'admin';
    authorAvatar: string;
    createdAt: string;
    content: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'python' | 'javascript' | 'web' | 'ai' | 'mobile' | 'security' | 'backend';
  categoryLabel: string;
  level: 'مبتدی' | 'متوسط' | 'پیشرفته';
  thumbnail: string;
  previewVideoUrl?: string;
  price: number; // in Tomans (تومان)
  discountPrice?: number; // in Tomans
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  durationHours: number;
  lessonsCount: number;
  instructor: Instructor;
  shortDescription: string;
  fullDescription: string;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: Module[];
  reviews: Review[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  status: 'published' | 'pending' | 'draft';
  updatedAt: string;
}

export interface Note {
  id: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  timestampSeconds: number;
  timestampLabel: string; // e.g. "04:15"
  content: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  code: string; // e.g. "MC-2026-8941"
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  instructorName: string;
  completionHours: number;
}

export interface DiscountCode {
  code: string;
  percent: number;
  maxAmount?: number;
  description: string;
  expiryDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  courseIds: string[];
  totalHours: number;
  jobRole: string; // e.g. "توسعه‌دهنده ارشد فرانت‌اند"
}
