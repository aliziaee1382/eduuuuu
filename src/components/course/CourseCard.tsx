import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Clock, Users, PlayCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { formatToman } from '../../lib/utils';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { setSelectedCourseId, setCurrentView, addToCart, cartCourseIds, enrolledCourseIds } = useApp();

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const isInCart = cartCourseIds.includes(course.id);

  const handleCardClick = () => {
    setSelectedCourseId(course.id);
    setCurrentView('course-detail');
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Thumbnail & Badges */}
      <div className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer" onClick={handleCardClick}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-wrap gap-1 z-10">
          <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg shadow-sm">
            {course.categoryLabel}
          </span>
          {course.isBestSeller && (
            <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black rounded-md sm:rounded-lg shadow-md flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-slate-950" />
              پرفروش
            </span>
          )}
          {course.isNew && (
            <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-500 text-slate-950 text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg shadow-md">
              جدید
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[9px] sm:text-[11px] font-medium rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-indigo-400" />
          <span>{course.durationHours}h</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        
        <div className="space-y-1.5 sm:space-y-2">
          {/* Instructor line */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-1.5 truncate max-w-[70%]">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
              />
              <span className="font-medium text-slate-300 truncate text-[10px] sm:text-xs">{course.instructor.name}</span>
            </div>
            <span className="text-[9px] sm:text-[11px] text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/20 shrink-0">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug sm:leading-relaxed cursor-pointer"
          >
            {course.title}
          </h3>

          <p className="text-[11px] text-slate-400 line-clamp-1 sm:line-clamp-2 leading-relaxed hidden sm:block">
            {course.shortDescription}
          </p>
        </div>

        {/* Stats & Rating */}
        <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            <span>{course.rating}</span>
            <span className="text-[9px] text-slate-500 font-normal hidden sm:inline">({course.ratingCount})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-xs">
            <Users className="w-3 h-3 text-slate-500" />
            <span>{course.studentsCount.toLocaleString('fa-IR')}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-1.5 flex items-center justify-between gap-1">
          <div>
            {course.price === 0 ? (
              <span className="text-xs sm:text-sm font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-lg inline-block">
                رایگان
              </span>
            ) : course.discountPrice ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-xs text-slate-500 line-through">
                    {course.price.toLocaleString('fa-IR')}
                  </span>
                  <span className="px-1 py-0.2 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-bold rounded">
                    ٪{course.discountPercent}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-black text-indigo-300">
                  {formatToman(course.discountPrice)}
                </span>
              </div>
            ) : (
              <span className="text-xs sm:text-sm font-black text-indigo-300">
                {formatToman(course.price)}
              </span>
            )}
          </div>

          {isEnrolled ? (
            <button
              onClick={() => {
                setSelectedCourseId(course.id);
                setCurrentView('player');
              }}
              className="px-2 py-1.5 sm:px-3.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] sm:text-xs rounded-xl transition-colors flex items-center gap-1 shadow-md shadow-emerald-600/20 shrink-0"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ورود به دوره</span>
              <span className="sm:hidden">ورود</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(course.id);
              }}
              disabled={isInCart}
              className={`px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                isInCart
                  ? 'bg-slate-800 text-indigo-300 border border-indigo-500/30'
                  : course.price === 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isInCart ? 'در سبد' : course.price === 0 ? 'رایگان' : 'خرید'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
