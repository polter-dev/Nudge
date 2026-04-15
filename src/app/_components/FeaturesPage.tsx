import { useNavigate } from 'react-router';
import {
  Video,
  Users,
  Eye,
  ListTodo,
  Timer,
  Trophy,
  BarChart3,
  Shield,
  Zap,
  Calendar,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const FONT_HEADING = "'General Sans', sans-serif";

const featureCategories = [
  {
    tag: 'Study Sessions',
    tagColor: '#7C3AED',
    tagBg: '#F3E8FF',
    features: [
      {
        icon: <Video size={24} color="#7C3AED" />,
        title: 'Live Video Sessions',
        description: 'Study face-to-face with your partner via live video. Cameras on, distractions off.',
      },
      {
        icon: <Users size={24} color="#7C3AED" />,
        title: 'Smart Matching',
        description: 'Get paired with students who match your study style, schedule, and academic level.',
      },
      {
        icon: <Eye size={24} color="#7C3AED" />,
        title: 'Solo Mode',
        description: 'Prefer studying alone? Solo mode gives you the same structured sessions with self-accountability.',
      },
    ],
  },
  {
    tag: 'Productivity',
    tagColor: '#F59E0B',
    tagBg: '#FEF3C7',
    features: [
      {
        icon: <Timer size={24} color="#F59E0B" />,
        title: 'Plan → Lock-in → Review',
        description: 'Every session follows a proven three-phase structure: plan your tasks, lock in and focus, then review your progress.',
      },
      {
        icon: <ListTodo size={24} color="#F59E0B" />,
        title: 'Task Management',
        description: 'Create and track your to-do list inside every session. Check off tasks as you complete them in real time.',
      },
      {
        icon: <Zap size={24} color="#F59E0B" />,
        title: 'Focus Scoring',
        description: 'Get a focus score after every session based on your engagement and task completion rate.',
      },
    ],
  },
  {
    tag: 'Community & Progress',
    tagColor: '#16A34A',
    tagBg: '#DCFCE7',
    features: [
      {
        icon: <Trophy size={24} color="#16A34A" />,
        title: 'Leaderboards',
        description: 'See how you rank against other students at your university. Compete for the top spot weekly.',
      },
      {
        icon: <BarChart3 size={24} color="#16A34A" />,
        title: 'Streaks & Stats',
        description: 'Track your daily streak, total focus time, sessions completed, and Nudge Points over time.',
      },
      {
        icon: <Calendar size={24} color="#16A34A" />,
        title: 'Session History',
        description: 'Review every past session with detailed breakdowns — partner, duration, tasks, and focus score.',
      },
    ],
  },
  {
    tag: 'Trust & Safety',
    tagColor: '#3B82F6',
    tagBg: '#DBEAFE',
    features: [
      {
        icon: <Shield size={24} color="#3B82F6" />,
        title: 'Verified .edu Only',
        description: 'Every user signs in through their university Microsoft account. No fake profiles, no strangers.',
      },
      {
        icon: <MessageSquare size={24} color="#3B82F6" />,
        title: 'No Chat, No Distractions',
        description: 'Sessions are designed for studying, not socializing. Video stays on, chat stays off.',
      },
    ],
  },
];

export function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col"
      style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="w-full flex items-center justify-between px-10 shrink-0"
        style={{ height: 64, borderBottom: '1px solid #F3F4F6' }}
      >
        <button
          onClick={() => navigate('/')}
          className="text-[18px] tracking-[0.15em]"
          style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          NUDGE
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-5 py-2 rounded-lg text-[14px] text-white"
          style={{ background: '#7C3AED', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          Sign Up with .edu
        </button>
      </nav>

      {/* Hero */}
      <section className="w-full py-20 px-6" style={{ background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[13px] mb-6"
            style={{ background: '#F3E8FF', color: '#7C3AED', fontWeight: 600 }}
          >
            Features
          </span>
          <h1
            style={{ fontFamily: FONT_HEADING, fontSize: 44, fontWeight: 700, color: '#111', lineHeight: 1.15 }}
          >
            Everything you need to{' '}
            <span style={{ color: '#7C3AED' }}>lock in</span>
          </h1>
          <p className="text-[18px] text-[#6B7280] mt-4 leading-relaxed max-w-xl mx-auto">
            Nudge is packed with tools designed to keep you focused, accountable, and productive.
          </p>
        </div>
      </section>

      {/* Feature categories */}
      {featureCategories.map((cat) => (
        <section key={cat.tag} className="w-full py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[13px] mb-6"
              style={{ background: cat.tagBg, color: cat.tagColor, fontWeight: 600 }}
            >
              {cat.tag}
            </span>

            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: cat.features.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}
            >
              {cat.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl p-6 transition-shadow hover:shadow-md"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: cat.tagBg }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-[16px] mb-2" style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111' }}>
                    {f.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7280] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="w-full py-20 px-6" style={{ background: '#2D1B4E' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: FONT_HEADING, fontSize: 32, fontWeight: 700, color: '#FFFFFF' }}>
            Ready to try it?
          </h2>
          <p className="text-[16px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sign up in 30 seconds with your university email. It&apos;s free.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 px-8 py-3.5 rounded-xl text-[15px] inline-flex items-center gap-2"
            style={{ background: '#7C3AED', color: '#FFFFFF', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Get Started Free <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
