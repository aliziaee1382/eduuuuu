import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  CheckCircle2, 
  Circle, 
  FileCode2, 
  Download, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert,
  Sliders,
  Award
} from 'lucide-react';
import { formatTimeSeconds, toPersianDigits } from '../../lib/utils';

export const VideoPlayerView: React.FC = () => {
  const { 
    selectedCourseId, 
    selectedLessonId, 
    setSelectedLessonId, 
    courses, 
    setCurrentView, 
    completedLessonIds, 
    toggleLessonCompletion,
    userNotes,
    addNote,
    deleteNote,
    questions,
    addQuestion,
    currentUser,
    issueCertificate
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  // Find active module and lesson
  let currentLesson = course?.modules?.[0]?.lessons?.[0];
  if (course?.modules) {
    for (const mod of course.modules) {
      const found = mod.lessons?.find(l => l.id === selectedLessonId);
      if (found) {
        currentLesson = found;
        break;
      }
    }
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  // Player controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [useSimulationMode, setUseSimulationMode] = useState(false);

  // Reset video error state on lesson change
  useEffect(() => {
    setHasVideoError(false);
    setIsPlaying(false);
    setCurrentTime(0);
  }, [selectedLessonId]);

  // Simulated timer for interactive code view when playing
  useEffect(() => {
    let interval: any;
    if ((hasVideoError || useSimulationMode) && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 180) {
            setIsPlaying(false);
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasVideoError, useSimulationMode, isPlaying]);

  // Tabs below video
  const [activeTab, setActiveTab] = useState<'notes' | 'qa' | 'attachments' | 'quiz'>('notes');

  // New Note state
  const [noteInput, setNoteInput] = useState('');

  // New Question state
  const [qaInput, setQaInput] = useState('');

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Dynamic anti-piracy watermark position
  const [watermarkPos, setWatermarkPos] = useState({ top: '15%', left: '15%' });

  useEffect(() => {
    // Watermark random bounce interval to deter screen recording software
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 70 + 10) + '%';
      const left = Math.floor(Math.random() * 70 + 10) + '%';
      setWatermarkPos({ top, left });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsSpeedMenuOpen(false);
  };

  const handleJumpToTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addNote({
      courseId: course.id,
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      timestampSeconds: currentTime,
      timestampLabel: formatTimeSeconds(currentTime),
      content: noteInput,
    });
    setNoteInput('');
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim()) return;
    addQuestion({
      lessonId: currentLesson.id,
      courseId: course.id,
      questionText: qaInput,
    });
    setQaInput('');
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8 text-center">
        <p className="text-slate-400 font-bold">دوره یا جلسه مورد نظر یافت نشد.</p>
      </div>
    );
  }

  const lessonNotes = userNotes.filter(n => n.lessonId === currentLesson.id);
  const lessonQuestions = questions.filter(q => q.lessonId === currentLesson.id);

  // Total course completion calculation
  const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const watchedInCourse = course.modules.flatMap(m => m.lessons).filter(l => completedLessonIds.includes(l.id)).length;
  const completionPercent = totalLessonsCount > 0 ? Math.round((watchedInCourse / totalLessonsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Top Header bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('course-detail')}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به جزئیات دوره
          </button>
          <div className="hidden sm:block border-r border-slate-800 pr-3 mr-1">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">{course.title}</h1>
            <p className="text-[11px] text-indigo-400 truncate">{currentLesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress bar info */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>پیشرفت شما:</span>
            <span className="font-bold text-indigo-400">٪{completionPercent}</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {completionPercent === 100 && (
            <button
              onClick={() => {
                issueCertificate(course.id);
                setCurrentView('dashboard');
              }}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 animate-bounce-short shadow-lg"
            >
              <Award className="w-4 h-4" />
              دریافت گواهینامه دوره
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Video Player + Playlist Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Video Screen & Controls */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Player Canvas Container */}
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
              


              {/* Video Element or Interactive Simulator Canvas */}
              {hasVideoError || useSimulationMode ? (
                <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 relative">
                  {/* Visual Coding Screen Simulation */}
                  <div className="w-full h-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-4 text-right font-mono text-xs overflow-hidden shadow-inner flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-400 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        <span className="font-bold text-slate-300 mr-2">مکتب‌کد - استودیو پخش آموزشی آنلاین</span>
                      </div>
                      <span className="text-indigo-400 font-bold">{currentLesson.title}</span>
                    </div>

                    <div className="space-y-2 dir-ltr text-left text-slate-300 overflow-y-auto max-h-48">
                      <p className="text-slate-500"># Interactive Code Studio - Session Lesson View</p>
                      <p className="text-emerald-400"><span className="text-indigo-400">def</span> <span className="text-amber-300">execute_lesson_demo</span>():</p>
                      <p className="pl-4 text-sky-300">course_title = <span className="text-amber-200">"{course.title}"</span></p>
                      <p className="pl-4 text-sky-300">lesson = <span className="text-amber-200">"{currentLesson.title}"</span></p>
                      <p className="pl-4 text-purple-400">print(<span className="text-amber-200">f"Playing: &#123;lesson&#125; in &#123;course_title&#125;"</span>)</p>
                      <p className="pl-4 text-emerald-400"><span className="text-indigo-400">return</span> <span className="text-amber-200">"کدنویسی با موفقیت کامپایل شد."</span></p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dir-rtl">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                        <span>پخش هوشمند کد و توضیحات تصویری فعال است</span>
                      </div>
                      <button
                        onClick={() => {
                          setHasVideoError(false);
                          setUseSimulationMode(false);
                          if (videoRef.current) videoRef.current.load();
                        }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-sans font-bold transition-colors"
                      >
                        تلاش مجدد بارگذاری ویدیو
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  key={currentLesson.id + videoQuality}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={handlePlayPause}
                  onError={() => setHasVideoError(true)}
                  crossOrigin="anonymous"
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain cursor-pointer"
                >
                  <source src={currentLesson.videoUrl} type="video/mp4" />
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
                </video>
              )}

              {/* Custom Overlay Controls */}
              <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                
                {/* Seek Bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-slate-700 accent-indigo-500 rounded-lg cursor-pointer"
                />

                {/* Buttons Bar */}
                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-3">
                    <button onClick={handlePlayPause} className="hover:text-indigo-400 transition-colors">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={() => handleJumpToTime(Math.max(0, currentTime - 10))}
                      className="hover:text-indigo-400 transition-colors text-xs flex items-center"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-[10px] mr-0.5">۱۰s</span>
                    </button>
                    <button
                      onClick={() => handleJumpToTime(Math.min(duration, currentTime + 10))}
                      className="hover:text-indigo-400 transition-colors text-xs flex items-center"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span className="text-[10px] mr-0.5">۱۰s</span>
                    </button>

                    <div className="text-xs font-mono text-slate-400 pr-2">
                      <span>{formatTimeSeconds(currentTime)}</span> / <span>{formatTimeSeconds(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Speed Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono rounded-lg transition-colors border border-slate-700"
                      >
                        {playbackSpeed}x
                      </button>
                      {isSpeedMenuOpen && (
                        <div className="absolute bottom-full mb-2 left-0 bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-xl z-40 space-y-1">
                          {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                            <button
                              key={speed}
                              onClick={() => handleSpeedChange(speed)}
                              className={`w-full px-3 py-1 text-xs rounded-lg font-mono text-right transition-colors ${
                                playbackSpeed === speed ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quality Selector */}
                    <select
                      value={videoQuality}
                      onChange={e => setVideoQuality(e.target.value)}
                      className="bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700 rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="1080p">1080p HD</option>
                      <option value="720p">720p</option>
                      <option value="480p">480p</option>
                    </select>

                    {/* Toggle Mark Completed */}
                    <button
                      onClick={() => toggleLessonCompletion(currentLesson.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        completedLessonIds.includes(currentLesson.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completedLessonIds.includes(currentLesson.id) ? 'مشاهده شد' : 'علامت به عنوان دیده شده'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Video Lesson Description & Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">{currentLesson.title}</h2>
                <span className="text-xs text-indigo-400 font-mono">مدت جلسه: {currentLesson.duration}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentLesson.summary}</p>
            </div>

            {/* Tabs Area Under Player */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              
              {/* Tabs Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  یادداشت‌های شخصی ({lessonNotes.length})
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'qa' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  پرسش و پاسخ این جلسه ({lessonQuestions.length})
                </button>
                <button
                  onClick={() => setActiveTab('attachments')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === 'attachments' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  فایل‌های ضمیمه ({currentLesson.attachments?.length || 0})
                </button>
                {currentLesson.quiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'quiz' ? 'bg-amber-600 text-white' : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    آزمون / تمرین کوتاه
                  </button>
                )}
              </div>

              {/* TAB 1: NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <form onSubmit={handleSaveNote} className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>ثبت یادداشت جدید در دقیقه <span className="font-mono text-indigo-400">{formatTimeSeconds(currentTime)}</span>:</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="نکته مهم این بخش از ویدیو را بنویسید..."
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        ثبت یادداشت
                      </button>
                    </div>
                  </form>

                  {/* Notes List */}
                  <div className="space-y-2">
                    {lessonNotes.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">
                        هنوز هیچ یادداشتی برای این جلسه ثبت نکرده‌اید.
                      </p>
                    ) : (
                      lessonNotes.map(note => (
                        <div
                          key={note.id}
                          className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs group"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleJumpToTime(note.timestampSeconds)}
                              className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-lg font-mono text-[11px] transition-colors border border-indigo-500/30"
                              title="پرش به این تایم در ویدیو"
                            >
                              ▶ {note.timestampLabel}
                            </button>
                            <span className="text-slate-200">{note.content}</span>
                          </div>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: QA */}
              {activeTab === 'qa' && (
                <div className="space-y-4">
                  <form onSubmit={handleSaveQuestion} className="space-y-2">
                    <textarea
                      rows={2}
                      placeholder="سوال خود درباره کدهای این جلسه را بنویسید..."
                      value={qaInput}
                      onChange={e => setQaInput(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors"
                    >
                      ارسال سوال به مدرس
                    </button>
                  </form>

                  <div className="space-y-3">
                    {lessonQuestions.map(q => (
                      <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <img src={q.studentAvatar} className="w-6 h-6 rounded-full" />
                          <span className="font-bold text-white">{q.studentName}</span>
                          <span className="text-[10px] text-slate-500">{q.createdAt}</span>
                        </div>
                        <p className="text-slate-300">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ATTACHMENTS */}
              {activeTab === 'attachments' && (
                <div className="space-y-3">
                  {currentLesson.attachments && currentLesson.attachments.length > 0 ? (
                    currentLesson.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                            <FileCode2 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{att.title}</span>
                            <span className="text-[10px] text-slate-400">حجم فایل: {att.size}</span>
                          </div>
                        </div>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); alert('دانلود فایل سورس کد با موفقیت انجام شد!'); }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          دانلود فایل
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">فایل ضمیمه‌ای برای این جلسه وجود ندارد.</p>
                  )}
                </div>
              )}

              {/* TAB 4: QUIZ */}
              {activeTab === 'quiz' && currentLesson.quiz && (
                <div className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>سنجش اطلاعات این جلسه:</span>
                  </div>

                  <p className="text-sm font-semibold text-white">{currentLesson.quiz.question}</p>

                  {currentLesson.quiz.codeSnippet && (
                    <pre dir="ltr" className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto">
                      <code>{currentLesson.quiz.codeSnippet}</code>
                    </pre>
                  )}

                  <div className="space-y-2">
                    {currentLesson.quiz.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedQuizOption(idx); setQuizSubmitted(false); }}
                        className={`w-full text-right p-3 rounded-xl border text-xs font-medium transition-all ${
                          selectedQuizOption === idx
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {idx + 1}. {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={selectedQuizOption === null}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    ثبت و مشاهده نتیجه
                  </button>

                  {quizSubmitted && (
                    <div className={`p-3 rounded-xl font-bold border ${
                      selectedQuizOption === currentLesson.quiz.correctOptionIndex
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}>
                      {selectedQuizOption === currentLesson.quiz.correctOptionIndex
                        ? 'آفرین! پاسخ شما کاملا درست بود 🎉'
                        : 'متاسفانه پاسخ اشتباه بود، ویدیو را مجددا مرور کنید.'}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* Right Col: Course Modules Playlist Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white">لیست جلسات و فصول</span>
                <span className="text-[11px] text-slate-400">{watchedInCourse} از {totalLessonsCount} جلسه دیده‌شده</span>
              </div>

              {/* Modules List */}
              <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {course.modules.map(mod => (
                  <div key={mod.id} className="space-y-1">
                    <div className="px-2 py-1.5 bg-slate-950 rounded-lg text-[11px] font-bold text-indigo-300 flex items-center justify-between">
                      <span className="truncate">{mod.title}</span>
                      <span className="text-[10px] text-slate-500">{mod.lessons.length} ویدیو</span>
                    </div>

                    <div className="space-y-1 pt-1">
                      {mod.lessons.map(les => {
                        const isCurrent = les.id === currentLesson.id;
                        const isWatched = completedLessonIds.includes(les.id);
                        return (
                          <button
                            key={les.id}
                            onClick={() => setSelectedLessonId(les.id)}
                            className={`w-full p-2.5 rounded-xl text-right text-xs transition-all flex items-start gap-2.5 ${
                              isCurrent
                                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 font-bold'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className="pt-0.5 shrink-0">
                              {isWatched ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block truncate">{les.title}</span>
                              <span className="text-[10px] text-slate-500 block font-mono">{les.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
