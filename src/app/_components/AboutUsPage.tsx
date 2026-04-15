import { useNavigate } from 'react-router';
import { Heart, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';

const FONT_HEADING = "'General Sans', sans-serif";

const values = [
  {
    icon: <GraduationCap size={28} color="#7C3AED" />,
    title: 'Student-first',
    description: 'Everything we build is designed by students, for students. We understand the struggle because we lived it.',
  },
  {
    icon: <Heart size={28} color="#F59E0B" />,
    title: 'Community over competition',
    description: 'We believe studying is better together. Nudge is about lifting each other up, not tearing each other down.',
  },
  {
    icon: <Lightbulb size={28} color="#16A34A" />,
    title: 'Science-backed methods',
    description: 'Our session structure is built on proven techniques like the Pomodoro method, body doubling, and spaced repetition.',
  },
];

const team = [
  { name: 'Guilherme O.', role: 'Founder & CEO', university: 'University of Central Florida', initials: 'GO', color: '#7C3AED' },
  { name: 'Ceara W.', role: 'Co-Founder & Design', university: 'University of Florida', initials: 'CW', color: '#F59E0B' },
  { name: 'Alex R.', role: 'Engineering', university: 'Florida State University', initials: 'AR', color: '#16A34A' },
  { name: 'Jordan P.', role: 'Community', university: 'University of Miami', initials: 'JP', color: '#3B82F6' },
];

export function AboutUsPage() {
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
            About Us
          </span>
          <h1
            style={{ fontFamily: FONT_HEADING, fontSize: 44, fontWeight: 700, color: '#111', lineHeight: 1.15 }}
          >
            Built by students who were{' '}
            <span style={{ color: '#7C3AED' }}>tired of procrastinating</span>
          </h1>
          <p className="text-[18px] text-[#6B7280] mt-4 leading-relaxed max-w-xl mx-auto">
            Nudge started as a simple idea in a dorm room: what if studying felt less lonely and more productive?
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-center mb-8"
            style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: '#111' }}
          >
            Our Story
          </h2>
          <div className="text-[16px] text-[#374151] leading-relaxed flex flex-col gap-4">
            <p>
              It started during finals week. We were sitting in the library, watching students around us doom-scroll
              their phones while their textbooks sat untouched. We were doing the same thing. Something had to change.
            </p>
            <p>
              We noticed something interesting: on the rare occasions we studied with a friend, we were dramatically
              more focused. Not because the friend was teaching us anything — just because someone was <em>there</em>.
              Psychologists call this &quot;body doubling,&quot; and it works.
            </p>
            <p>
              So we built Nudge — a platform that pairs verified college students together for live, structured
              study sessions. No small talk. No distractions. Just focused work with someone who gets it.
            </p>
            <p style={{ color: '#7C3AED', fontWeight: 600 }}>
              Today, over 2,400 students across 50+ universities use Nudge to stay on track.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-20 px-6" style={{ background: '#FAF5FF' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center mb-12"
            style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: '#111' }}
          >
            What We Believe
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl p-6 text-center"
                style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F3E8FF' }}>
                  {v.icon}
                </div>
                <h3 className="text-[16px] mb-2" style={{ fontFamily: FONT_HEADING, fontWeight: 700, color: '#111' }}>
                  {v.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center mb-12"
            style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: '#111' }}
          >
            Meet the Team
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[22px] mb-3"
                  style={{ background: t.color, fontFamily: FONT_HEADING, fontWeight: 700 }}
                >
                  {t.initials}
                </div>
                <p className="text-[15px]" style={{ fontWeight: 600, color: '#111' }}>{t.name}</p>
                <p className="text-[13px]" style={{ color: '#7C3AED', fontWeight: 500 }}>{t.role}</p>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">{t.university}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6" style={{ background: '#2D1B4E' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: FONT_HEADING, fontSize: 32, fontWeight: 700, color: '#FFFFFF' }}>
            Join the movement
          </h2>
          <p className="text-[16px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Be part of a community that actually wants to see you succeed.
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
