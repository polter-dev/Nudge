import { useNavigate } from 'react-router';
import {
  Brain,
  Users,
  Target,
  TrendingUp,
  Clock,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const FONT_HEADING = "'General Sans', sans-serif";

const problems = [
  {
    icon: <Clock size={24} color="#EF4444" />,
    title: 'Procrastination is real',
    description:
      'Studies show that 86% of college students procrastinate on assignments. Without structure, it\'s easy to waste hours scrolling instead of studying.',
  },
  {
    icon: <Brain size={24} color="#EF4444" />,
    title: 'Studying alone is hard',
    description:
      'Solo study sessions lack accountability. When no one is watching, it\'s tempting to take "just one more break" that turns into an hour.',
  },
  {
    icon: <Target size={24} color="#EF4444" />,
    title: 'No structure, no results',
    description:
      'Without a clear plan and timed intervals, study sessions become unfocused and unproductive. Good intentions aren\'t enough.',
  },
];

const solutions = [
  {
    icon: <Users size={24} color="#7C3AED" />,
    title: 'Accountability partners',
    description:
      'Get matched with verified students who keep you on track. Knowing someone is counting on you changes everything.',
  },
  {
    icon: <TrendingUp size={24} color="#7C3AED" />,
    title: 'Structured focus sessions',
    description:
      'Our Plan → Lock-in → Review cycle gives you a proven framework. No more guessing how to study effectively.',
  },
  {
    icon: <ShieldCheck size={24} color="#7C3AED" />,
    title: 'Verified student community',
    description:
      'Only .edu emails allowed. Study with real college students who understand the pressure and want to succeed.',
  },
];

export function WhyNudgePage() {
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
            Why Nudge?
          </span>
          <h1
            style={{ fontFamily: FONT_HEADING, fontSize: 44, fontWeight: 700, color: '#111', lineHeight: 1.15 }}
          >
            Because studying alone{' '}
            <span style={{ color: '#7C3AED' }}>isn&apos;t working</span>
          </h1>
          <p className="text-[18px] text-[#6B7280] mt-4 leading-relaxed max-w-xl mx-auto">
            Nudge pairs you with verified college students for live, structured study sessions
            that actually keep you focused.
          </p>
        </div>
      </section>


      {/* The Problem */}
      <section className="w-full py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[13px] mb-4"
              style={{ background: '#FEE2E2', color: '#EF4444', fontWeight: 600 }}
            >
              The Problem
            </span>
            <h2 style={{ fontFamily: FONT_HEADING, fontSize: 32, fontWeight: 700, color: '#111' }}>
              Sound familiar?
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-xl p-6"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: '#FEE2E2' }}>
                  {p.icon}
                </div>
                <h3 className="text-[16px] mb-2" style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111' }}>
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="w-full py-20 px-6" style={{ background: '#FAF5FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[13px] mb-4"
              style={{ background: '#F3E8FF', color: '#7C3AED', fontWeight: 600 }}
            >
              The Solution
            </span>
            <h2 style={{ fontFamily: FONT_HEADING, fontSize: 32, fontWeight: 700, color: '#111' }}>
              Nudge fixes this
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-xl p-6"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: '#F3E8FF' }}>
                  {s.icon}
                </div>
                <h3 className="text-[16px] mb-2" style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111' }}>
                  {s.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: FONT_HEADING, fontSize: 32, fontWeight: 700, color: '#111' }}>
            Ready to focus?
          </h2>
          <p className="text-[16px] text-[#6B7280] mt-3">
            Join thousands of students who stopped procrastinating and started locking in.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 px-8 py-3.5 rounded-xl text-white text-[15px] inline-flex items-center gap-2"
            style={{ background: '#7C3AED', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Get Started Free <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
