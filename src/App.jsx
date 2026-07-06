import React, { useState } from 'react';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('instructor@internportal.com');
  const [loginPassword, setLoginPassword] = useState('********');

  // Global User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Sir Md Imran',
    title: 'Lead Frontend Instructor',
    email: 'imran@internportal.com',
    initials: 'MI',
    joinedDate: 'January 2025'
  });

  // Dynamic Background Themes Config - Premium Black & Blue Mixes
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const themes = {
    midnight: 'from-slate-950 via-slate-900 to-blue-950 text-slate-100',
    sapphire: 'from-black via-slate-950 to-indigo-950 text-slate-100',
    cyber: 'from-slate-950 via-indigo-950 to-slate-900 text-slate-100',
    stealth: 'from-neutral-950 via-slate-900 to-neutral-950 text-slate-100'
  };

  // UI Control States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Interactive Teacher-Student Interaction States
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'The React Basics project deadline is extended by 24 hours.', date: 'Today, 10:00 AM', targetedTo: 'Frontend Web Dev' },
    { id: 2, text: 'Live Q&A session scheduled for tomorrow at 4:00 PM.', date: 'Yesterday', targetedTo: 'All Batches' }
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementBatch, setAnnouncementBatch] = useState('All Batches');

  // Data Records States
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'React Basics Implementation', course: 'Frontend Web Dev', submissions: 18, dueDate: '2026-07-15', status: 'Active' },
    { id: 2, title: 'Tailwind Responsive UI Layout', course: 'UI/UX Design', submissions: 24, dueDate: '2026-07-10', status: 'Active' },
    { id: 3, title: 'Node.js API Authentication', course: 'Backend Node.js', submissions: 12, dueDate: '2026-07-02', status: 'Completed' },
  ]);

  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'JavaScript ES6 Essentials', course: 'Frontend Web Dev', questions: 15, attempts: 32, status: 'Active' },
    { id: 2, title: 'CSS Flexbox & Grid Master', course: 'UI/UX Design', questions: 10, attempts: 40, status: 'Active' },
    { id: 3, title: 'MongoDB Aggregations', course: 'Backend Node.js', questions: 20, attempts: 15, status: 'Closed' },
  ]);

  const [classesData] = useState([
    { id: 1, name: 'Frontend Web Dev - Batch A', studentsCount: 45, timing: 'Mondays & Thursdays (02:00 PM)', averageAttendance: '92%' },
    { id: 2, name: 'UI/UX Design Masterclass', studentsCount: 35, timing: 'Tuesdays & Fridays (11:00 AM)', averageAttendance: '88%' },
    { id: 3, name: 'Backend Node.js Advanced', studentsCount: 40, timing: 'Wednesdays & Saturdays (04:00 PM)', averageAttendance: '95%' }
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, title: 'React Lifecycle CheatSheet.pdf', course: 'Frontend Web Dev', downloads: 42, size: '2.4 MB' },
    { id: 2, title: 'Tailwind Flexbox Grid Playbook.pdf', course: 'UI/UX Design', downloads: 31, size: '1.8 MB' },
    { id: 3, title: 'Express Middleware Boilerplate.zip', course: 'Backend Node.js', downloads: 38, size: '4.1 MB' }
  ]);

  // Handle Profile Sync
  const handleProfileChange = (field, value) => {
    setUserProfile(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name') {
        const words = value.trim().split(' ');
        updated.initials = words.length >= 2 
          ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
          : words[0] ? words[0][0].toUpperCase() : 'MI';
      }
      return updated;
    });
  };

  // Post Announcement Method
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements([
      {
        id: Date.now(),
        text: newAnnouncement,
        date: 'Just Now',
        targetedTo: announcementBatch
      },
      ...announcements
    ]);
    setNewAnnouncement('');
  };

  // Auth Functions
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('Dashboard');
  };

  const handleLogoutAction = () => {
    if (confirm("Are you sure you want to log out from InternPortal?")) {
      setIsLoggedIn(false);
    }
  };

  // Dynamic Item Distribution Controllers
  const handleCreateAssignment = () => {
    const title = prompt("Enter Assignment Title:");
    if (!title) return;
    const course = prompt("Enter Course Name:");
    setAssignments([{
      id: Date.now(),
      title,
      course: course || 'General Course',
      submissions: 0,
      dueDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    }, ...assignments]);
  };

  const handleCreateQuiz = () => {
    const title = prompt("Enter Quiz Title:");
    if (!title) return;
    const course = prompt("Enter Course Name:");
    setQuizzes([{
      id: Date.now(),
      title,
      course: course || 'General Course',
      questions: 10,
      attempts: 0,
      status: 'Active'
    }, ...quizzes]);
  };

  const navItems = ['Dashboard', 'Classes', 'Assignments', 'Quizzes', 'Materials', 'Profile'];

  // Data Filtering Implementations
  const filteredAssignments = assignments.filter(item => 
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.course.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'All' || item.status === statusFilter)
  );

  const filteredQuizzes = quizzes.filter(item => 
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.course.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'All' || item.status === statusFilter)
  );

  // VIEW: INITIAL PORTAL SECURITY SHIELD
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 font-sans text-slate-100 antialiased">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">InternPortal</h1>
            <p className="text-sm text-slate-400">Instructor Operations Hub</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Instructor Account Email</label>
              <input 
                type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Secure Password</label>
              <input 
                type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-950/50 transition-all active:scale-95 mt-6 text-sm">
              Verify Credentials & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[currentTheme]} flex font-sans transition-all duration-700 antialiased`}>
      
      {/* SIDEBAR PHONE DRAWBACK SCREEN BACKDROP */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* DARK OBSIDIAN SIDEBAR PANEL */}
      <aside className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950/90 border-r border-slate-900 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 -translate-x-full lg:static">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-900 justify-between">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-wide">InternPortal</span>
            <button className="lg:hidden text-slate-400 hover:text-slate-200" onClick={() => setIsSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => { setActiveTab(item); setIsSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === item ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
              >
                <span>{item}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dark Mode Color Engine Picker */}
        <div className="p-4 border-t border-slate-900 space-y-3 bg-slate-950/40">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block px-2">Core Dark Profile</span>
          <div className="grid grid-cols-4 gap-2 px-2">
            <button title="Midnight Void" onClick={() => setCurrentTheme('midnight')} className={`h-6 rounded-md bg-gradient-to-br from-slate-900 to-blue-950 border-2 ${currentTheme === 'midnight' ? 'border-blue-400 scale-105' : 'border-slate-800'}`} />
            <button title="Deep Sapphire" onClick={() => setCurrentTheme('sapphire')} className={`h-6 rounded-md bg-gradient-to-br from-black to-indigo-950 border-2 ${currentTheme === 'sapphire' ? 'border-blue-400 scale-105' : 'border-slate-800'}`} />
            <button title="Cyber Indigo" onClick={() => setCurrentTheme('cyber')} className={`h-6 rounded-md bg-gradient-to-br from-slate-950 to-slate-800 border-2 ${currentTheme === 'cyber' ? 'border-blue-400 scale-105' : 'border-slate-800'}`} />
            <button title="Stealth Carbon" onClick={() => setCurrentTheme('stealth')} className={`h-6 rounded-md bg-gradient-to-br from-neutral-900 to-black border-2 ${currentTheme === 'stealth' ? 'border-blue-400 scale-105' : 'border-slate-800'}`} />
          </div>
          <button onClick={handleLogoutAction} className="w-full flex items-center px-4 py-2.5 rounded-xl font-medium text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/30 transition-all duration-200 text-sm mt-2">
            <span>🚪 Close Workspace</span>
          </button>
        </div>
      </aside>

      {/* DASHBOARD GRAPHICS LAYOUT CONTAINER */}
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Universal Top Bar Header */}
        <header className="h-16 bg-slate-950/40 backdrop-blur-md border-b border-slate-900 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-slate-400 hover:bg-slate-900 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-xl font-bold text-white tracking-tight">{activeTab}</h1>
          </div>
          
          <div onClick={() => setActiveTab('Profile')} className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-slate-900/60 transition-all">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{userProfile.name}</p>
              <p className="text-xs text-slate-400">{userProfile.title}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shadow-md ring-2 ring-slate-800 group-hover:scale-105 transition-all">
              {userProfile.initials}
            </div>
          </div>
        </header>

        {/* Layout Panels Workspace */}
        <div className="p-6 space-y-8 max-w-[1600px] mx-auto w-full flex-1">
          
          {/* TAB AREA: DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Welcome, {userProfile.name}!</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Control live classes, deliver assignments, and communicate instantly with students.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleCreateAssignment} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-950/50 transition-all active:scale-95">
                    ➕ Create Assignment
                  </button>
                  <button onClick={handleCreateQuiz} className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-950/50 transition-all active:scale-95">
                    ➕ Configure Quiz
                  </button>
                </div>
              </div>

              {/* Stat Counters Card Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Active Assignments</span>
                    <span className="text-3xl font-black text-white block">{assignments.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center text-xl border border-blue-900/30">📝</div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Quizzes Formulated</span>
                    <span className="text-3xl font-black text-white block">{quizzes.length}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center text-xl border border-emerald-900/30">⏱️</div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Assigned Batches</span>
                    <span className="text-3xl font-black text-white block">3 <span className="text-sm font-medium text-slate-400">/ 120 Enrolled</span></span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center text-xl border border-purple-900/30">🎓</div>
                </div>
              </div>

              {/* BROADCAST INTERACTION CENTER */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm lg:col-span-1 space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-base">Broadcast Student Notice</h3>
                    <p className="text-xs text-slate-400">Push instantaneous messages directly to connected students.</p>
                  </div>
                  <form onSubmit={handlePostAnnouncement} className="space-y-3">
                    <textarea 
                      rows="3" required placeholder="Type instructions, class changes, or reminder alerts..." value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)}
                      className="w-full text-sm border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-blue-500 bg-slate-950 text-white placeholder-slate-500"
                    />
                    <div className="flex justify-between items-center gap-2">
                      <select 
                        value={announcementBatch} onChange={(e) => setAnnouncementBatch(e.target.value)}
                        className="text-xs border border-slate-800 rounded-lg p-2 bg-slate-950 text-slate-300 focus:outline-none"
                      >
                        <option value="All Batches">All Classes</option>
                        <option value="Frontend Web Dev">Frontend Web Dev</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Backend Node.js">Backend Node.js</option>
                      </select>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                        Publish Notice
                      </button>
                    </div>
                  </form>
                </div>

                {/* Announcement Message Log */}
                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base mb-3">Announcement Board Feed</h3>
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                      {announcements.map(notice => (
                        <div key={notice.id} className="p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <span className="bg-blue-950 text-blue-400 px-2 py-0.5 rounded-md border border-blue-900/30">{notice.targetedTo}</span>
                            <span>{notice.date}</span>
                          </div>
                          <p className="text-sm text-slate-200 font-medium">{notice.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-800/60 mt-2">💡 Messages push to student apps globally as soon as they are submitted.</p>
                </div>
              </div>

              {/* Overview Data Stream Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
                    <h3 className="font-bold text-white">Assignments Summary</h3>
                    <button onClick={() => setActiveTab('Assignments')} className="text-xs text-blue-400 font-bold hover:underline">Manage Suite</button>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {assignments.slice(0, 3).map(item => (
                      <div key={item.id} className="p-4 flex justify-between items-center hover:bg-slate-800/30 transition-colors">
                        <div>
                          <p className="text-sm font-bold text-slate-100">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.course} • Submissions: {item.submissions}</p>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-950 text-blue-400 border border-blue-900/30">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
                    <h3 className="font-bold text-white">Quizzes Summary</h3>
                    <button onClick={() => setActiveTab('Quizzes')} className="text-xs text-emerald-400 font-bold hover:underline">Manage Suite</button>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {quizzes.slice(0, 3).map(item => (
                      <div key={item.id} className="p-4 flex justify-between items-center hover:bg-slate-800/30 transition-colors">
                        <div>
                          <p className="text-sm font-bold text-slate-100">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.course} • Attempts: {item.attempts}</p>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-400 border border-emerald-900/30">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB AREA: BATCH CLASSROOM TRACKER */}
          {activeTab === 'Classes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Active Classroom Schedules</h2>
                <p className="text-sm text-slate-400">Launch student interaction sessions and manage enrolled rosters.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classesData.map(c => (
                  <div key={c.id} className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded-lg uppercase tracking-wide border border-blue-900/30">Live Roster</span>
                        <span className="text-xs text-slate-400 font-semibold">{c.timing}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white pt-1">{c.name}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800 py-3 text-sm">
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Students</span>
                        <span className="font-bold text-slate-200">{c.studentsCount} Active</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Avg Attendance</span>
                        <span className="font-bold text-emerald-400">{c.averageAttendance}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => alert(`Opening student lists for ${c.name}...`)} className="w-full text-xs font-bold text-slate-300 bg-slate-950 hover:bg-slate-900 border border-slate-800 py-2.5 rounded-xl transition-colors">
                        Roster Logs
                      </button>
                      <button onClick={() => alert(`Launching live meeting terminal for ${c.name}...`)} className="w-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl transition-colors">
                        Start Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB AREA: FULL ASSIGNMENTS WORKSPACE */}
          {activeTab === 'Assignments' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl shadow-sm">
                <input 
                  type="text" placeholder="Search distributed assignments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 flex-1 md:max-w-md bg-slate-950 text-white placeholder-slate-500"
                />
                <button onClick={handleCreateAssignment} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all">
                  ➕ Distribute New Assignment
                </button>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/40 border-b border-slate-800 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      <th className="py-3 px-6">Assignment Info</th>
                      <th className="py-3 px-6">Course Framework</th>
                      <th className="py-3 px-6 text-center">Submissions</th>
                      <th className="py-3 px-6">Target Deadline</th>
                      <th className="py-3 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-sm font-medium">
                    {filteredAssignments.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-6 font-bold text-slate-100">{item.title}</td>
                        <td className="py-4 px-6 text-slate-400">{item.course}</td>
                        <td className="py-4 px-6 text-center font-bold text-blue-400">{item.submissions} Reviewed</td>
                        <td className="py-4 px-6 text-slate-400">{item.dueDate}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Active' ? 'bg-green-950 text-green-400 border border-green-900/40' : 'bg-slate-800 text-slate-400'}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB AREA: QUIZZES FULL WORKSPACE */}
          {activeTab === 'Quizzes' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl shadow-sm">
                <input 
                  type="text" placeholder="Filter dynamic quiz challenges..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 flex-1 md:max-w-md bg-slate-950 text-white placeholder-slate-500"
                />
                <button onClick={handleCreateQuiz} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all">
                  ➕ Launch Live Quiz
                </button>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/40 border-b border-slate-800 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      <th className="py-3 px-6">Quiz Module Title</th>
                      <th className="py-3 px-6">Associated Course</th>
                      <th className="py-3 px-6 text-center">Questions Quantity</th>
                      <th className="py-3 px-6 text-center">Attempts Received</th>
                      <th className="py-3 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-sm font-medium">
                    {filteredQuizzes.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-6 font-bold text-slate-100">{item.title}</td>
                        <td className="py-4 px-6 text-slate-400">{item.course}</td>
                        <td className="py-4 px-6 text-center text-slate-300">{item.questions} Qs</td>
                        <td className="py-4 px-6 text-center font-bold text-emerald-400">{item.attempts} Logged</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Active' ? 'bg-green-950 text-green-400 border border-green-900/40' : 'bg-red-950 text-red-400 border border-red-900/40'}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB AREA: STUDY SYLLABUS FILES SUITE */}
          {activeTab === 'Materials' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl shadow-sm">
                <div>
                  <h3 className="font-bold text-white text-base">Course Material Repository</h3>
                  <p className="text-xs text-slate-400">Push downloadable frameworks, lectures, and resources straight to student cohorts.</p>
                </div>
                <button onClick={() => alert('Launching cloud asset manager...')} className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all self-center shadow-md shadow-purple-950/40">
                  📤 Upload Learning Material
                </button>
              </div>

              <div className="bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/40 border-b border-slate-800 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      <th className="py-3 px-6">Resource Document</th>
                      <th className="py-3 px-6">Class Stream</th>
                      <th className="py-3 px-6">Size</th>
                      <th className="py-3 px-6 text-center">Student Download Metrics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-sm font-medium">
                    {materials.map(file => (
                      <tr key={file.id} className="hover:bg-slate-800/30">
                        <td className="py-4 px-6 font-bold text-slate-100 flex items-center gap-2">
                          <span>📄</span> {file.title}
                        </td>
                        <td className="py-4 px-6 text-slate-400">{file.course}</td>
                        <td className="py-4 px-6 text-slate-500">{file.size}</td>
                        <td className="py-4 px-6 text-center text-purple-400 font-bold">{file.downloads} Downloads Recorded</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB AREA: INSTRUCTOR EDITABLE PROFILE CARD */}
          {activeTab === 'Profile' && (
            <div className="max-w-3xl mx-auto bg-slate-900/70 border border-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-700 via-indigo-950 to-slate-950 p-6 flex items-end relative border-b border-slate-800/60">
                <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-2xl bg-blue-600 border-4 border-slate-900 shadow-xl text-white font-black text-2xl flex items-center justify-center">
                  {userProfile.initials}
                </div>
              </div>
              <div className="pt-14 pb-8 px-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Instructor Profile Configuration</h3>
                  <p className="text-xs text-slate-400">Edit dynamic interface identity, display cards, and portal synchronizations.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Full Instructor Identity Name</label>
                    <input 
                      type="text" value={userProfile.name} onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Designation Role Tag</label>
                    <input 
                      type="text" value={userProfile.title} onChange={(e) => handleProfileChange('title', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Administrative Mail Contact</label>
                    <input 
                      type="email" value={userProfile.email} onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Portal Enrolled: {userProfile.joinedDate}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">● Database Sync Live</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}