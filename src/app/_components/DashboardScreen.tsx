import {
  Users,
  User,
  Check,
  Trophy,
  Star,
  ArrowRight,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  Plus,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

/* ─── Image URLs ─── */
const avatarGui =
  'https://images.unsplash.com/photo-1758613171187-9a41d0fc93ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwZ2xhc3NlcyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const avatarSarah =
  'https://images.unsplash.com/photo-1758521540968-3af0cc2074a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZGVudCUyMGhlYWRzaG90JTIwZnJpZW5kbHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const avatarZack =
  'https://images.unsplash.com/photo-1758685848426-fcff62c9fd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwZ2xhc3NlcyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const avatarMia =
  'https://images.unsplash.com/photo-1654786265381-890d4f34e9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBsYXRpbmElMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc3MTk3NTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const avatarJin =
  'https://images.unsplash.com/photo-1622904341310-391c07a25e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzcxOTc1ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const FONT_HEADING = "'General Sans', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

/* ─── Top Bar ─── */
function TopBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user ? user.firstName : 'Student';

  return (
    <div
      className="w-full flex items-center justify-between px-8 shrink-0"
      style={{ height: 52, background: '#2D1B4E', fontFamily: FONT_BODY }}
    >
      {/* Left — "Dashboard" with underline */}
      <div className="relative h-full flex items-center">
        <span
          className="text-[14px]"
          style={{ fontWeight: 600, color: '#FFFFFF' }}
        >
          Dashboard
        </span>
        <span
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
          style={{ background: '#FFFFFF' }}
        />
      </div>

      {/* Right — bell + avatar + name + chevron */}
      <div className="flex items-center gap-4">
        <button className="relative" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Bell size={20} color="rgba(255,255,255,0.7)" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{ background: '#7C3AED', border: '2px solid #2D1B4E' }}
          />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px]"
              style={{ background: '#7C3AED', fontWeight: 600 }}
            >
              {user ? user.firstName[0]?.toUpperCase() : '?'}
            </div>
            <span
              className="text-[13px]"
              style={{ color: '#FFFFFF', fontWeight: 500 }}
            >
              {displayName}
            </span>
            <ChevronDown size={16} color="rgba(255,255,255,0.6)" />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg overflow-hidden z-20"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {user && (
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <p className="text-[13px] text-[#111]" style={{ fontWeight: 600 }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF] truncate">{user.email}</p>
                  </div>
                )}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} color="#6B7280" />
                  <span className="text-[14px] text-[#374151]" style={{ fontWeight: 500 }}>
                    Settings
                  </span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut size={16} color="#EF4444" />
                  <span className="text-[14px] text-[#EF4444]" style={{ fontWeight: 500 }}>
                    Log out
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Stats Banner ─── */
function StatsBanner() {
  const streakDays = [
    { label: 'S', done: true },
    { label: 'M', done: true },
    { label: 'T', done: true },
    { label: 'W', done: true },
    { label: 'T', done: true },
    { label: 'F', done: false, isToday: true },
    { label: 'S', done: false },
  ];

  return (
    <div
      className="w-full rounded-2xl flex items-stretch overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        minHeight: 120,
      }}
    >
      {/* Nudge Points */}
      <div
        className="flex flex-col items-center justify-center px-8"
        style={{ minWidth: 140, borderRight: '1px solid #E5E7EB' }}
      >
        <span
          style={{
            fontFamily: FONT_HEADING,
            fontSize: 42,
            fontWeight: 800,
            color: '#111111',
            lineHeight: 1,
          }}
        >
          480
        </span>
        <span className="text-[13px] mt-1" style={{ color: '#7C3AED', fontWeight: 600 }}>
          Nudge Points
        </span>
      </div>

      {/* Streak */}
      <div className="flex-1 flex flex-col justify-center px-8 py-4">
        <div className="flex items-baseline gap-2">
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 18,
              fontWeight: 700,
              color: '#111111',
            }}
          >
            12-day streak
          </span>
          <span className="text-[13px] text-[#6B7280]">You&apos;re a legend, keep going!</span>
        </div>

        <div className="flex items-center gap-5 mt-3">
          {streakDays.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
                {day.label}
              </span>
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  background: day.done ? '#7C3AED' : 'transparent',
                  border: day.done ? 'none' : `2px solid ${day.isToday ? '#7C3AED' : '#D1D5DB'}`,
                }}
              >
                {day.done && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Champion badge */}
      <div
        className="flex flex-col items-center justify-center px-8"
        style={{ minWidth: 130, borderLeft: '1px solid #E5E7EB' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
            boxShadow: '0 2px 8px rgba(245,158,11,0.3)',
          }}
        >
          <Star size={28} color="#FFFFFF" fill="#FFFFFF" />
        </div>
        <span
          className="text-[13px] mt-2"
          style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111111' }}
        >
          Champion
        </span>
      </div>
    </div>
  );
}

/* ─── Ready to Lock-in ─── */
function ReadyToLockIn() {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <h2
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 26,
          fontWeight: 700,
          color: '#111111',
        }}
      >
        Ready to Lock-in?
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <style>{`
          @keyframes dash-online-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: '#16A34A',
            animation: 'dash-online-pulse 2s ease-in-out infinite',
          }}
        />
        <span className="text-[14px] text-[#6B7280]">480 matching right now</span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px]"
          style={{
            background: '#FFFFFF',
            border: '2px solid #111111',
            color: '#111111',
            fontWeight: 600,
            fontFamily: FONT_HEADING,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/matchmaking')}
        >
          <Users size={16} />
          Find a Partner
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px]"
          style={{
            background: '#FFFFFF',
            border: '2px solid #111111',
            color: '#111111',
            fontWeight: 600,
            fontFamily: FONT_HEADING,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/solo')}
        >
          <User size={16} />
          Study Solo
        </button>
      </div>
    </div>
  );
}

/* ─── Recent Sessions (card rows) ─── */
function RecentSessions() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const sessions = [
    {
      id: 1,
      name: 'Zack J.',
      uni: 'University of Florida',
      avatar: avatarZack,
      details: '25 min · 4 rounds',
      score: 91,
      date: 'Mar 23, 2025',
      tasksCompleted: 12,
      totalTasks: 15,
      focusBreakdown: [
        { phase: 'Plan', minutes: 5 },
        { phase: 'Lock-in', minutes: 15 },
        { phase: 'Review', minutes: 5 },
      ],
    },
    {
      id: 2,
      name: 'Sarah M.',
      uni: 'Florida State',
      avatar: avatarSarah,
      details: '50 min · 3 rounds',
      score: 94,
      date: 'Mar 22, 2025',
      tasksCompleted: 18,
      totalTasks: 20,
      focusBreakdown: [
        { phase: 'Plan', minutes: 10 },
        { phase: 'Lock-in', minutes: 30 },
        { phase: 'Review', minutes: 10 },
      ],
    },
    {
      id: 3,
      name: 'Solo Session',
      uni: '',
      avatar: null,
      details: '25 min · 2 rounds',
      score: 88,
      date: 'Mar 21, 2025',
      tasksCompleted: 8,
      totalTasks: 10,
      focusBreakdown: [
        { phase: 'Plan', minutes: 5 },
        { phase: 'Lock-in', minutes: 15 },
        { phase: 'Review', minutes: 5 },
      ],
    },
  ];

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#111111' }}
        >
          Recent Sessions
        </h3>
        <button
          className="flex items-center gap-1 text-[13px]"
          style={{ color: '#7C3AED', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          View all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex flex-col">
        {sessions.map((s, i) => {
          const isExpanded = expandedId === s.id;
          return (
            <div key={s.id}>
              {i > 0 && <div className="my-1" style={{ height: 1, background: '#F3F4F6' }} />}

              {/* Main row */}
              <button
                className="w-full flex items-center py-3 rounded-lg transition-colors"
                style={{
                  background: isExpanded ? '#FAF5FF' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 8px',
                }}
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
                onMouseEnter={(e) => {
                  if (!isExpanded) e.currentTarget.style.background = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) e.currentTarget.style.background = 'transparent';
                }}
              >
                {s.avatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 mr-3">
                    <ImageWithFallback
                      src={s.avatar}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-3"
                    style={{ background: '#F3F4F6' }}
                  >
                    <User size={18} color="#9CA3AF" />
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[14px] text-[#111]" style={{ fontWeight: 600 }}>
                    {s.name}
                  </p>
                  {s.uni && (
                    <p className="text-[12px] text-[#9CA3AF] truncate">{s.uni}</p>
                  )}
                </div>
                <span className="text-[13px] text-[#9CA3AF] mx-4 whitespace-nowrap">
                  {s.details}
                </span>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[13px] text-white shrink-0"
                  style={{ background: '#F59E0B', fontWeight: 700, minWidth: 48, justifyContent: 'center' }}
                >
                  {s.score}%
                </span>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  className="mx-2 mb-2 px-5 py-4 rounded-lg"
                  style={{ background: '#FAFAFA', border: '1px solid #F3F4F6' }}
                >
                  <div className="flex gap-8">
                    {/* Left: summary */}
                    <div className="flex flex-col gap-2">
                      <p className="text-[12px] text-[#9CA3AF]">Date</p>
                      <p className="text-[13px] text-[#111]" style={{ fontWeight: 500 }}>{s.date}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[12px] text-[#9CA3AF]">Tasks</p>
                      <p className="text-[13px] text-[#111]" style={{ fontWeight: 500 }}>
                        {s.tasksCompleted}/{s.totalTasks} completed
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[12px] text-[#9CA3AF]">Focus Score</p>
                      <p className="text-[13px]" style={{ fontWeight: 700, color: '#F59E0B' }}>
                        {s.score}%
                      </p>
                    </div>
                  </div>

                  {/* Phase breakdown bar */}
                  <div className="mt-4">
                    <p className="text-[12px] text-[#9CA3AF] mb-2">Session Breakdown</p>
                    <div className="flex rounded-full overflow-hidden" style={{ height: 8 }}>
                      {s.focusBreakdown.map((phase) => {
                        const totalMin = s.focusBreakdown.reduce((sum, p) => sum + p.minutes, 0);
                        const pct = (phase.minutes / totalMin) * 100;
                        const colors: Record<string, string> = {
                          Plan: '#7C3AED',
                          'Lock-in': '#F59E0B',
                          Review: '#16A34A',
                        };
                        return (
                          <div
                            key={phase.phase}
                            style={{ width: `${pct}%`, background: colors[phase.phase] ?? '#D1D5DB' }}
                          />
                        );
                      })}
                    </div>
                    <div className="flex gap-4 mt-2">
                      {s.focusBreakdown.map((phase) => {
                        const colors: Record<string, string> = {
                          Plan: '#7C3AED',
                          'Lock-in': '#F59E0B',
                          Review: '#16A34A',
                        };
                        return (
                          <div key={phase.phase} className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: colors[phase.phase] ?? '#D1D5DB' }}
                            />
                            <span className="text-[11px] text-[#6B7280]">
                              {phase.phase} ({phase.minutes}m)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── To-do List ─── */
function TodoList() {
  const { user } = useAuth();
  const displayName = user ? user.firstName : 'Name';

  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([
    { id: 1, text: '', done: false },
    { id: 2, text: '', done: false },
    { id: 3, text: '', done: false },
    { id: 4, text: '', done: false },
    { id: 5, text: '', done: false },
  ]);

  const updateText = (id: number, text: string) =>
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, text } : item)));

  const toggleDone = (id: number) =>
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));

  const removeTodo = (id: number) =>
    setTodos((t) => t.filter((item) => item.id !== id));

  const addTodo = () =>
    setTodos((t) => [...t, { id: Date.now(), text: '', done: false }]);

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <h3
        className="mb-4"
        style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#111111' }}
      >
        {displayName}&apos;s To-do List:
      </h3>

      <div className="flex flex-col gap-1">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3 group">
            <button
              onClick={() => toggleDone(todo.id)}
              className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{
                border: todo.done ? 'none' : '2px solid #D1D5DB',
                background: todo.done ? '#7C3AED' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {todo.done && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
            </button>
            <input
              value={todo.text}
              onChange={(e) => updateText(todo.id, e.target.value)}
              placeholder="Add a task..."
              className="flex-1 outline-none text-[13px] bg-transparent"
              style={{
                color: todo.done ? '#9CA3AF' : '#111111',
                textDecoration: todo.done ? 'line-through' : 'none',
                borderBottom: '1px solid #F3F4F6',
                padding: '8px 0',
                fontFamily: FONT_BODY,
              }}
            />
            <button
              onClick={() => removeTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Trash2 size={14} color="#9CA3AF" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addTodo}
        className="flex items-center gap-2 mt-3 text-[12px]"
        style={{
          color: '#7C3AED',
          fontWeight: 500,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Plus size={14} />
        Add task
      </button>
    </div>
  );
}

/* ─── Leaderboard with tabs ─── */
function Leaderboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'allTime' | 'weekly'>('allTime');

  const currentUserName = user
    ? `${user.firstName} ${user.lastName[0]}.`
    : 'You';

  const allTimeRows = [
    { rank: 1, name: 'Mia R.', hours: '16h 05m', avatar: avatarMia },
    { rank: 2, name: 'Jin K.', hours: '15h 40m', avatar: avatarJin },
    { rank: 3, name: currentUserName, hours: '14h 20m', avatar: avatarGui, isUser: true },
    { rank: 4, name: 'Sarah M.', hours: '13h 55m', avatar: avatarSarah },
    { rank: 5, name: 'Zack J.', hours: '12h 30m', avatar: avatarZack },
  ];

  const weeklyRows = [
    { rank: 1, name: currentUserName, hours: '6h 10m', avatar: avatarGui, isUser: true },
    { rank: 2, name: 'Sarah M.', hours: '5h 45m', avatar: avatarSarah },
    { rank: 3, name: 'Jin K.', hours: '4h 30m', avatar: avatarJin },
    { rank: 4, name: 'Mia R.', hours: '3h 50m', avatar: avatarMia },
    { rank: 5, name: 'Zack J.', hours: '3h 10m', avatar: avatarZack },
  ];

  const rows = tab === 'allTime' ? allTimeRows : weeklyRows;

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={18} color="#D97706" />
          <h3
            style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#111111' }}
          >
            Leaderboard
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4" style={{ borderBottom: '1px solid #E5E7EB' }}>
        {(['allTime', 'weekly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="pb-2 px-3 text-[13px] relative"
            style={{
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#7C3AED' : '#9CA3AF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t === 'allTime' ? 'All Time' : 'Weekly'}
            {tab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: '#7C3AED' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Podium (top 3) */}
      <div className="flex items-end justify-center gap-4 mb-4" style={{ minHeight: 100 }}>
        {/* 2nd place */}
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden mb-1">
            <ImageWithFallback
              src={rows[1]?.avatar ?? ''}
              alt={rows[1]?.name ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="flex items-center justify-center rounded-t-md"
            style={{
              width: 50,
              height: 50,
              background: '#F3F4F6',
              fontFamily: FONT_HEADING,
              fontSize: 20,
              fontWeight: 700,
              color: '#374151',
            }}
          >
            2
          </div>
        </div>

        {/* 1st place */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mb-1">
            <ImageWithFallback
              src={rows[0]?.avatar ?? ''}
              alt={rows[0]?.name ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="flex items-center justify-center rounded-t-md"
            style={{
              width: 50,
              height: 70,
              background: '#FDE68A',
              fontFamily: FONT_HEADING,
              fontSize: 22,
              fontWeight: 800,
              color: '#92400E',
            }}
          >
            1
          </div>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden mb-1">
            <ImageWithFallback
              src={rows[2]?.avatar ?? ''}
              alt={rows[2]?.name ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="flex items-center justify-center rounded-t-md"
            style={{
              width: 50,
              height: 40,
              background: '#FED7AA',
              fontFamily: FONT_HEADING,
              fontSize: 20,
              fontWeight: 700,
              color: '#9A3412',
            }}
          >
            3
          </div>
        </div>
      </div>

      {/* Rows 4 & 5 */}
      <div className="flex flex-col gap-1">
        {rows.slice(3).map((r) => (
          <div
            key={r.rank}
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{ background: r.isUser ? '#FAF5FF' : 'transparent' }}
          >
            <span className="text-[13px] w-5 text-center" style={{ fontWeight: 700, color: '#374151' }}>
              {r.rank}
            </span>
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
              <ImageWithFallback
                src={r.avatar}
                alt={r.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="flex-1 text-[13px] flex items-center gap-2"
              style={{ fontWeight: r.isUser ? 600 : 400, color: '#111111' }}
            >
              {r.name}
              {r.isUser && (
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[10px]"
                  style={{ background: '#7C3AED', color: '#FFFFFF', fontWeight: 600 }}
                >
                  You
                </span>
              )}
            </span>
            <span
              className="text-[12px] text-[#9CA3AF]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {r.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Your Stats ─── */
function YourStats() {
  const stats = [
    { label: 'Total Focus Time', value: '47h 23m', color: '#7C3AED' },
    { label: 'Avg Focus Score', value: '91%', color: '#16A34A' },
    { label: 'Sessions Completed', value: '84', color: '#D97706' },
  ];

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <h3
        className="mb-4"
        style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#111111' }}
      >
        Your Stats
      </h3>

      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="pl-4 py-2"
            style={{ borderLeft: `4px solid ${s.color}` }}
          >
            <p className="text-[12px] text-[#9CA3AF] mb-0.5">{s.label}</p>
            <p
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 24,
                fontWeight: 700,
                color: s.color,
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function DashboardScreen() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[#9CA3AF] text-[14px]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ fontFamily: FONT_BODY }}>
      <TopBar />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#F9FAFB' }}>
        <div className="mx-auto px-6 py-6" style={{ maxWidth: 1100 }}>
          {/* Stats banner */}
          <StatsBanner />

          {/* Ready to Lock-in */}
          <ReadyToLockIn />

          {/* Two-column grid */}
          <div className="flex gap-6 mt-6">
            {/* Left column */}
            <div className="flex flex-col gap-6" style={{ width: '55%' }}>
              <RecentSessions />
              <TodoList />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6" style={{ width: '45%' }}>
              <Leaderboard />
              <YourStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
