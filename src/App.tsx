/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { HomeView } from './components/home/HomeView';
import { CoursesListView } from './components/course/CoursesListView';
import { CourseDetailView } from './components/course/CourseDetailView';
import { VideoPlayerView } from './components/player/VideoPlayerView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { InstructorDashboard } from './components/dashboard/InstructorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { CartCheckoutModal } from './components/cart/CartCheckoutModal';
import { BlogView } from './components/blog/BlogView';
import { LearningPathsView, AboutView, ContactView, FaqView } from './components/pages/SupportPages';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'courses':
        return <CoursesListView />;
      case 'course-detail':
        return <CourseDetailView />;
      case 'player':
        return <VideoPlayerView />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'instructor-panel':
        return <InstructorDashboard />;
      case 'admin-panel':
        return <AdminDashboard />;
      case 'cart':
        return <CartCheckoutModal />;
      case 'blog':
        return <BlogView />;
      case 'paths':
        return <LearningPathsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FaqView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderView()}
      </main>
      {/* Hide footer on dedicated player view to maximize video view space */}
      {currentView !== 'player' && <Footer />}
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
