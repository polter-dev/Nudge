import { useState } from 'react';
import { Trophy, Medal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from './AuthProvider';

const FONT_HEADING = "'General Sans', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

const avatarGui =
  'https://images.unsplash.com/photo-1758613171187-9a41d0fc93ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwZ2xhc3NlcyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080';
const avatarSarah =
  'https://images.unsplash.com/photo-1758521540968-3af0cc2074a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZGVudCUyMGhlYWRzaG90JTIwZnJpZW5kbHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080';
const avatarZack =
  'https://images.unsplash.com/photo-1758685848426-fcff62c9fd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc3R1ZGVudCUyMHBvcnRyYWl0JTIwZ2xhc3NlcyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzcxOTc1ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080';
const avatarMia =
  'https://images.unsplash.com/photo-1654786265381-890d4f34e9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBsYXRpbmElMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc3MTk3NTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080';
const avatarJin =
  'https://images.unsplash.com/photo-1622904341310-391c07a25e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBzdHVkZW50JTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzcxOTc1ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080';
const avatarAlex =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=256&h=256&q=80';
const avatarEmma =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=256&h=256&q=80';
const avatarDavid =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=256&h=256&q=80';
const avatarLisa =
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?fit=crop&w=256&h=256&q=80';
const avatarMarcus =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=256&h=256&q=80';

interface LeaderboardRow {
  rank: number;
  name: string;
  university: string;
  hours: string;
  sessions: number;
  avgScore: number;
  avatar: string;
  isUser?: boolean;
}

export function LeaderboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<'allTime' | 'weekly' | 'monthly'>('allTime');

  const currentUserName = user
    ? `${user.firstName} ${user.lastName[0]}.`
    : 'You';

  const allTimeRows: LeaderboardRow[] = [
    { rank: 1, name: 'Mia R.', university: 'University of Florida', hours: '48h 05m', sessions: 142, avgScore: 94, avatar: avatarMia },
    { rank: 2, name: 'Jin K.', university: 'Florida State University', hours: '45h 40m', sessions: 128, avgScore: 92, avatar: avatarJin },
    { rank: 3, name: currentUserName, university: user?.university ?? 'Your University', hours: '42h 20m', sessions: 118, avgScore: 91, avatar: avatarGui, isUser: true },
    { rank: 4, name: 'Sarah M.', university: 'Florida State University', hours: '39h 55m', sessions: 104, avgScore: 89, avatar: avatarSarah },
    { rank: 5, name: 'Zack J.', university: 'University of Florida', hours: '37h 30m', sessions: 96, avgScore: 88, avatar: avatarZack },
    { rank: 6, name: 'Alex T.', university: 'University of Central Florida', hours: '34h 15m', sessions: 88, avgScore: 87, avatar: avatarAlex },
    { rank: 7, name: 'Emma W.', university: 'University of Miami', hours: '31h 40m', sessions: 82, avgScore: 86, avatar: avatarEmma },
    { rank: 8, name: 'David L.', university: 'Florida Atlantic University', hours: '28h 20m', sessions: 74, avgScore: 85, avatar: avatarDavid },
    { rank: 9, name: 'Lisa C.', university: 'University of South Florida', hours: '25h 55m', sessions: 66, avgScore: 84, avatar: avatarLisa },
    { rank: 10, name: 'Marcus B.', university: 'Florida International University', hours: '23h 10m', sessions: 58, avgScore: 83, avatar: avatarMarcus },
  ];

  const weeklyRows: LeaderboardRow[] = [
    { rank: 1, name: currentUserName, university: user?.university ?? 'Your University', hours: '8h 10m', sessions: 18, avgScore: 93, avatar: avatarGui, isUser: true },
    { rank: 2, name: 'Sarah M.', university: 'Florida State University', hours: '7h 45m', sessions: 16, avgScore: 91, avatar: avatarSarah },
    { rank: 3, name: 'Jin K.', university: 'Florida State University', hours: '6h 30m', sessions: 14, avgScore: 90, avatar: avatarJin },
    { rank: 4, name: 'Mia R.', university: 'University of Florida', hours: '5h 50m', sessions: 12, avgScore: 89, avatar: avatarMia },
    { rank: 5, name: 'Zack J.', university: 'University of Florida', hours: '5h 10m', sessions: 10, avgScore: 87, avatar: avatarZack },
    { rank: 6, name: 'Emma W.', university: 'University of Miami', hours: '4h 35m', sessions: 9, avgScore: 86, avatar: avatarEmma },
    { rank: 7, name: 'Alex T.', university: 'University of Central Florida', hours: '3h 50m', sessions: 8, avgScore: 85, avatar: avatarAlex },
    { rank: 8, name: 'David L.', university: 'Florida Atlantic University', hours: '3h 20m', sessions: 7, avgScore: 84, avatar: avatarDavid },
    { rank: 9, name: 'Lisa C.', university: 'University of South Florida', hours: '2h 45m', sessions: 6, avgScore: 82, avatar: avatarLisa },
    { rank: 10, name: 'Marcus B.', university: 'Florida International University', hours: '2h 10m', sessions: 5, avgScore: 80, avatar: avatarMarcus },
  ];

  const monthlyRows: LeaderboardRow[] = [
    { rank: 1, name: 'Jin K.', university: 'Florida State University', hours: '22h 15m', sessions: 56, avgScore: 93, avatar: avatarJin },
    { rank: 2, name: 'Mia R.', university: 'University of Florida', hours: '21h 30m', sessions: 52, avgScore: 92, avatar: avatarMia },
    { rank: 3, name: currentUserName, university: user?.university ?? 'Your University', hours: '19h 45m', sessions: 48, avgScore: 91, avatar: avatarGui, isUser: true },
    { rank: 4, name: 'Sarah M.', university: 'Florida State University', hours: '18h 20m', sessions: 44, avgScore: 90, avatar: avatarSarah },
    { rank: 5, name: 'Zack J.', university: 'University of Florida', hours: '16h 40m', sessions: 40, avgScore: 88, avatar: avatarZack },
    { rank: 6, name: 'Alex T.', university: 'University of Central Florida', hours: '15h 00m', sessions: 36, avgScore: 87, avatar: avatarAlex },
    { rank: 7, name: 'Emma W.', university: 'University of Miami', hours: '13h 30m', sessions: 32, avgScore: 86, avatar: avatarEmma },
    { rank: 8, name: 'David L.', university: 'Florida Atlantic University', hours: '12h 10m', sessions: 28, avgScore: 85, avatar: avatarDavid },
    { rank: 9, name: 'Marcus B.', university: 'Florida International University', hours: '10h 50m', sessions: 24, avgScore: 84, avatar: avatarMarcus },
    { rank: 10, name: 'Lisa C.', university: 'University of South Florida', hours: '9h 30m', sessions: 20, avgScore: 82, avatar: avatarLisa },
  ];

  const rowsMap = { allTime: allTimeRows, weekly: weeklyRows, monthly: monthlyRows };
  const rows = rowsMap[tab];

  const top3 = rows.slice(0, 3);

  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = [80, 110, 60];
  const podiumBg = ['#F3F4F6', '#FDE68A', '#FED7AA'];
  const podiumTextColor = ['#374151', '#92400E', '#9A3412'];
  const podiumAvatarSize = [44, 56, 44];

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ fontFamily: FONT_BODY }}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#F9FAFB' }}>
        <div className="mx-auto px-6 py-6" style={{ maxWidth: 800 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} color="#374151" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy size={24} color="#D97706" />
              <h1 style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: '#111111' }}>
                Leaderboard
              </h1>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex rounded-xl overflow-hidden mb-8"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
          >
            {(['allTime', 'weekly', 'monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-3 text-[14px] transition-colors"
                style={{
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? '#FFFFFF' : '#6B7280',
                  background: tab === t ? '#7C3AED' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t === 'allTime' ? 'All Time' : t === 'weekly' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>

          {/* Podium */}
          <div
            className="rounded-2xl p-8 mb-6"
            style={{
              background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-end justify-center gap-6" style={{ minHeight: 200 }}>
              {podiumOrder.map((entry, i) => {
                if (!entry) return null;
                return (
                  <div key={entry.rank} className="flex flex-col items-center">
                    {entry.rank === 1 && (
                      <Medal size={24} color="#D97706" className="mb-1" />
                    )}
                    <div
                      className="rounded-full overflow-hidden mb-2"
                      style={{
                        width: podiumAvatarSize[i],
                        height: podiumAvatarSize[i],
                        border: entry.rank === 1 ? '3px solid #F59E0B' : '2px solid #E5E7EB',
                      }}
                    >
                      <ImageWithFallback
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className="text-[13px] mb-0.5"
                      style={{
                        fontWeight: 700,
                        color: podiumTextColor[i],
                      }}
                    >
                      {entry.name}
                      {entry.isUser && (
                        <span
                          className="ml-1.5 inline-flex rounded-full px-1.5 py-0.5 text-[9px]"
                          style={{ background: '#7C3AED', color: '#FFFFFF', fontWeight: 600, verticalAlign: 'middle' }}
                        >
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF] mb-2">{entry.hours}</p>
                    <div
                      className="flex items-center justify-center rounded-t-lg"
                      style={{
                        width: 70,
                        height: podiumHeights[i],
                        background: podiumBg[i],
                        fontFamily: FONT_HEADING,
                        fontSize: entry.rank === 1 ? 28 : 22,
                        fontWeight: 800,
                        color: podiumTextColor[i],
                      }}
                    >
                      {entry.rank}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full rankings table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Table header */}
            <div
              className="flex items-center px-5 py-3"
              style={{ borderBottom: '1px solid #E5E7EB', background: '#FAFAFA' }}
            >
              <span className="text-[11px] text-[#9CA3AF] w-10" style={{ fontWeight: 600 }}>RANK</span>
              <span className="text-[11px] text-[#9CA3AF] flex-1" style={{ fontWeight: 600 }}>STUDENT</span>
              <span className="text-[11px] text-[#9CA3AF] w-24 text-right" style={{ fontWeight: 600 }}>HOURS</span>
              <span className="text-[11px] text-[#9CA3AF] w-24 text-right" style={{ fontWeight: 600 }}>SESSIONS</span>
              <span className="text-[11px] text-[#9CA3AF] w-24 text-right" style={{ fontWeight: 600 }}>AVG SCORE</span>
            </div>

            {/* Rows */}
            {rows.map((r) => (
              <div
                key={r.rank}
                className="flex items-center px-5 py-3 transition-colors hover:bg-gray-50"
                style={{
                  borderBottom: '1px solid #F3F4F6',
                  background: r.isUser ? '#FAF5FF' : 'transparent',
                }}
              >
                <span
                  className="text-[14px] w-10"
                  style={{
                    fontWeight: 700,
                    color: r.rank <= 3 ? '#D97706' : '#374151',
                    fontFamily: FONT_HEADING,
                  }}
                >
                  {r.rank}
                </span>
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={r.avatar}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] flex items-center gap-2" style={{ fontWeight: r.isUser ? 600 : 500, color: '#111' }}>
                      {r.name}
                      {r.isUser && (
                        <span
                          className="inline-flex rounded-full px-2 py-0.5 text-[10px]"
                          style={{ background: '#7C3AED', color: '#FFFFFF', fontWeight: 600 }}
                        >
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">{r.university}</p>
                  </div>
                </div>
                <span
                  className="text-[13px] w-24 text-right"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: '#374151' }}
                >
                  {r.hours}
                </span>
                <span className="text-[13px] w-24 text-right text-[#6B7280]">
                  {r.sessions}
                </span>
                <span
                  className="text-[13px] w-24 text-right"
                  style={{ fontWeight: 600, color: r.avgScore >= 90 ? '#16A34A' : '#F59E0B' }}
                >
                  {r.avgScore}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
