import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseFilter } from './CourseFilter';
import { CourseCard } from './CourseCard';
import { BookOpen, SlidersHorizontal, Search } from 'lucide-react';

export const CoursesListView: React.FC = () => {
  const { courses, searchQuery, selectedCategory, coursePriceType } = useApp();

  const [sortBy, setSortBy] = useState('popular');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Filter courses based on criteria
  let filteredCourses = courses.filter(c => {
    // Price type (Free vs Paid)
    if (coursePriceType === 'free' && c.price > 0) {
      return false;
    }
    if (coursePriceType === 'paid' && c.price === 0) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchCategory = c.categoryLabel.toLowerCase().includes(q);
      const matchInstructor = c.instructor.name.toLowerCase().includes(q);
      const matchDesc = c.shortDescription.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchInstructor && !matchDesc) return false;
    }

    // Category
    if (selectedCategory !== 'all' && c.category !== selectedCategory) {
      return false;
    }

    // Level
    if (selectedLevel !== 'all' && c.level !== selectedLevel) {
      return false;
    }

    // Discount
    if (onlyDiscounted && !c.discountPrice) {
      return false;
    }

    return true;
  });

  // Sorting
  filteredCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'popular') return b.studentsCount - a.studentsCount;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'price-asc') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    if (sortBy === 'price-desc') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white">آرشیو جامع دوره‌های آموزشی</h1>
            <p className="text-xs text-slate-400">نمایش {filteredCourses.length} دوره آموزشی با فیلترهای هوشمند</p>
          </div>
        </div>

        {/* Main 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-1">
            <CourseFilter
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              onlyDiscounted={onlyDiscounted}
              setOnlyDiscounted={setOnlyDiscounted}
            />
          </div>

          {/* Right Column: Courses Grid */}
          <div className="lg:col-span-3 space-y-6">
            {filteredCourses.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <Search className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">هیچ دوره‌ای با این فیلترها یافت نشد.</h3>
                <p className="text-xs text-slate-400">لطفاً عبارت جستجو یا دسته‌بندی انتخابی را تغییر دهید.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
