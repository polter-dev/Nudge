import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Lock,
  Video,
  BarChart3,
  Target,
  Trophy,
  Shield,
  ChevronDown,
  Timer,
  Eye,
  Bell,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import fauLogo from '../../imports/FAU.svg';

const imgPairMode =
  'https://images.unsplash.com/photo-1598870783714-7db1e192e047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdmlkZW8lMjBjYWxsJTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzc1MTY1NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const imgSoloMode =
  'https://images.unsplash.com/photo-1773625680521-24296b61ba25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdHVkeWluZyUyMGFsb25lJTIwZGVzayUyMG1pbmltYWx8ZW58MXx8fHwxNzc1MTY1NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const imgHero =
  'https://images.unsplash.com/photo-1618544976528-6fe8b8a811b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0d28lMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXIlMjB2aWRlbyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzcxOTc2MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

// University logos
const logoFIU = 'figma:asset/6644055b74f87f43967f143052fe7a00f4407d1d.png';
const logoUCF = 'figma:asset/a5818af18f4a147cd7ffac275813911a0cadb3f8.png';
const logoUF = 'figma:asset/f3267102acc39195026db0b200ed7403cd035cfc.png';
const logoUSF = 'figma:asset/d8ddbd4fb84d8e07284cc465f6498f126cf98226.png';

/* ───────────────────── NAV ───────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('landing-scroll');
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 10);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between"
      style={{
        height: 64,
        padding: '0 48px',
        background: '#FFFFFF',
        boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.2s',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: '0.12em',
          color: '#111111',
        }}
      >
        NUDGE
      </span>

      <div className="flex items-center gap-8">
        {[
          { label: 'Why Nudge', path: '/why-nudge' },
          { label: 'About Us', path: '/about' },
        ].map((l) => (
          <button
            key={l.label}
            onClick={() => navigate(l.path)}
            className="text-[14px] text-[#6B7280] hover:text-[#111] transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <button
        className="px-5 py-2 rounded-lg text-[14px] text-white"
        style={{ background: '#7C3AED', fontWeight: 600 }}
        onClick={() => navigate('/signup')}
      >
        Sign Up with .edu
      </button>
    </nav>
  );
}

/* ───────────────────── HERO ───────────────────── */
function Hero() {
  const navigate = useNavigate();
  
  const scrollToModes = () => {
    document.getElementById('modes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="flex flex-col items-center text-center"
      style={{ padding: '80px 48px 60px' }}
    >
      {/* Eyebrow pill */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-6"
        style={{ background: '#F3E8FF' }}
      >
        <span className="text-[13px]">✨</span>
        <span className="text-[13px]" style={{ color: '#7C3AED', fontWeight: 500 }}>
          2,400+ students already studying smarter
        </span>
      </span>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontSize: 52,
          fontWeight: 700,
          color: '#111111',
          lineHeight: 1.1,
        }}
      >
        Stop procrastinating.
        <br />
        Start studying{' '}
        <span className="relative inline-block">
          together.
          <svg
            className="absolute -bottom-1 left-0 w-full"
            height="10"
            viewBox="0 0 200 10"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2 7 C30 2, 50 9, 80 5 C110 1, 140 8, 170 4 C185 2, 195 6, 198 5"
              stroke="#7C3AED"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-[#6B7280] mt-5 mx-auto text-[18px]"
        style={{ maxWidth: 560, lineHeight: 1.6 }}
      >Get paired with other verified college students<br />for live, video-based study sessions.<br /><span style={{ fontWeight: 700 }}>No Yapping. No Distractions. Just Nudge.</span></p>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          className="flex items-center gap-2 px-7 text-white rounded-[10px] text-[15px]"
          style={{ height: 48, background: '#7C3AED', fontWeight: 600 }}
          onClick={() => navigate('/signup')}
        >
          Get Started Free
          <ArrowRight size={16} />
        </button>
        
        {/* Animated "See how it works" */}
        <button
          onClick={scrollToModes}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          style={{ background: 'transparent', border: 'none' }}
        >
          <span className="text-[14px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
            See how it works
          </span>
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown size={20} color="#9CA3AF" />
          </motion.div>
        </button>
      </div>

      {/* Hero screenshot in browser frame */}
      <div
        className="mt-10 w-full"
        style={{
          maxWidth: 960,
          transform: 'perspective(1200px) rotateX(2deg)',
        }}
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
          }}
        >
          {/* Browser chrome */}
          
          {/* Screenshot */}
          
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── MODES SECTION ───────────────────── */
function ModesSection() {
  const pairFeatures = [
    {
      icon: <Video size={18} color="#7C3AED" />,
      text: "Live 1:1 video with verified .edu students",
    },
    {
      icon: <Timer size={18} color="#7C3AED" />,
      text: "Shared Pomodoro timer keeps you both on track",
    },
    {
      icon: <Target size={18} color="#7C3AED" />,
      text: "Real-time focus scores for mutual accountability",
    },
  ];

  const soloFeatures = [
    {
      icon: <Eye size={18} color="#F59E0B" />,
      text: "AI focus detection runs locally in your browser",
    },
    {
      icon: <Shield size={18} color="#F59E0B" />,
      text: "Privacy-first: no data ever leaves your device",
    },
    {
      icon: <Bell size={18} color="#F59E0B" />,
      text: "Gentle nudges when you get distracted",
    },
  ];

  return (
    <section
      id="modes-section"
      className="flex flex-col items-center"
      style={{ padding: '80px 48px', background: '#FFFFFF' }}
    >
      <div className="w-full grid grid-cols-2 gap-12" style={{ maxWidth: 1100 }}>
        {/* PAIR MODE */}
        <div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: '#7C3AED',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            PAIR MODE
          </h2>
          
          <div
            className="rounded-3xl overflow-hidden mb-6"
            style={{
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <ImageWithFallback
              src={imgPairMode}
              alt="Pair Mode - Student studying with video call"
              className="w-full block"
              style={{ aspectRatio: '16/11', objectFit: 'cover' }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {pairFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    background: '#F3E8FF',
                  }}
                >
                  {feature.icon}
                </div>
                <p
                  className="text-[14px] text-[#6B7280]"
                  style={{ lineHeight: 1.8, paddingTop: 4 }}
                >
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SOLO MODE */}
        <div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: '#F59E0B',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            SOLO MODE
          </h2>
          
          <div
            className="rounded-3xl overflow-hidden mb-6"
            style={{
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <ImageWithFallback
              src={imgSoloMode}
              alt="Solo Mode - Student studying alone"
              className="w-full block"
              style={{ aspectRatio: '16/11', objectFit: 'cover' }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {soloFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    background: '#FEF3C7',
                  }}
                >
                  {feature.icon}
                </div>
                <p
                  className="text-[14px] text-[#6B7280]"
                  style={{ lineHeight: 1.8, paddingTop: 4 }}
                >
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── TRUSTED COMMUNITIES ───────────────────── */
function TrustedCommunities() {
  const colleges = [
    { name: 'UF', fullName: 'University of Florida', color: '#FA4616' },
    { name: 'USF', fullName: 'University of South Florida', color: '#006747' },
    { name: 'FIU', fullName: 'Florida International University', color: '#081E3F' },
    { name: 'UCF', fullName: 'University of Central Florida', color: '#BA9B37' },
    { name: 'FAU', fullName: 'Florida Atlantic University', color: '#003366' },
    { name: 'UF', fullName: 'University of Florida', color: '#FA4616' },
    { name: 'USF', fullName: 'University of South Florida', color: '#006747' },
    { name: 'FIU', fullName: 'Florida International University', color: '#081E3F' },
    { name: 'UCF', fullName: 'University of Central Florida', color: '#BA9B37' },
    { name: 'FAU', fullName: 'Florida Atlantic University', color: '#003366' },
  ];

  return (
    <section
      className="flex flex-col items-center"
      style={{ padding: '80px 0', background: '#F9FAFB', overflow: 'hidden' }}
    >
      <h3
        className="text-center mb-8"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: '#9CA3AF',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Trusted Communities
      </h3>
      
      <div className="relative w-full" style={{ height: 100 }}>
        <motion.div
          className="flex items-center gap-12 absolute"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: 0 }}
        >
          {/* Double the array for seamless loop */}
          {[...colleges, ...colleges].map((college, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 140,
                height: 80,
                border: '1.5px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <span
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: college.color,
                  letterSpacing: '0.05em',
                }}
              >
                {college.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── FEATURES GRID ───────────────────── */
function FeaturesGrid() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Video size={28} color="#7C3AED" />,
      title: 'Live Video Sessions',
      description: 'Connect face-to-face with verified college students in real-time study sessions.',
    },
    {
      icon: <Timer size={28} color="#7C3AED" />,
      title: 'Pomodoro Timer',
      description: 'Stay focused with synchronized 25-minute work intervals and 5-minute breaks.',
    },
    {
      icon: <BarChart3 size={28} color="#7C3AED" />,
      title: 'AI Reports & Analytics',
      description: 'Track your productivity with intelligent insights and detailed focus analytics.',
    },
    {
      icon: <Target size={28} color="#F59E0B" />,
      title: 'Focus Score Tracking',
      description: 'Monitor your concentration levels with real-time scoring and improvement metrics.',
    },
    {
      icon: <Trophy size={28} color="#F59E0B" />,
      title: 'Streak Building',
      description: 'Build consistent study habits and celebrate milestones with achievement tracking.',
    },
    {
      icon: <Shield size={28} color="#F59E0B" />,
      title: 'Privacy-First AI',
      description: 'Computer vision runs locally in your browser—your data never leaves your device.',
    },
  ];

  return (
    <section
      className="flex flex-col items-center"
      style={{ padding: '100px 48px', background: '#FFFFFF' }}
    >
      <div className="w-full" style={{ maxWidth: 1000 }}>
        <h2
          className="mb-2 text-center"
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: 32,
            fontWeight: 700,
            color: '#111111',
          }}
        >
          Some Features
        </h2>
        <div
          className="rounded mx-auto"
          style={{ width: 40, height: 3, background: '#111111', marginBottom: 48 }}
        />

        <div className="relative grid grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8"
              style={{
                border: '1.5px solid #E5E7EB',
                background: '#FFFFFF',
                opacity: idx >= 3 ? 0.25 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#111111',
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[14px] text-[#6B7280]"
                style={{ lineHeight: 1.6 }}
              >
                {feature.description}
              </p>
            </div>
          ))}
          
          {/* View All Features Button - Overlaying center bottom */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: '50%',
              top: '100%',
              transform: 'translate(-50%, -24px)',
              zIndex: 10,
            }}
          >
            <button
              onClick={() => navigate('/features')}
              className="px-8 py-3 rounded-xl text-white text-[15px] hover:opacity-90 transition-opacity"
              style={{
                background: '#7C3AED',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
              }}
            >
              View All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FINAL CTA ───────────────────── */
function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-col items-center text-center"
      style={{ padding: '120px 48px', background: '#FFFFFF' }}
    >
      <h2
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontSize: 36,
          fontWeight: 700,
          color: '#111111',
        }}
      >
        Your study partner is waiting.
      </h2>
      <p className="text-[16px] text-[#6B7280] mt-3 mb-8">
        Free forever for students. No credit card. Just your .edu email.
      </p>
      <button
        className="px-10 text-white rounded-xl text-[16px]"
        style={{ height: 52, background: '#7C3AED', fontWeight: 600 }}
        onClick={() => navigate('/signup')}
      >
        Sign Up with .edu Email
      </button>
      <div className="flex items-center gap-2 mt-4">
        <Lock size={13} color="#9CA3AF" />
        <span className="text-[12px] text-[#9CA3AF]">
          Your camera data never leaves your device
        </span>
      </div>
    </section>
  );
}

/* ───────────────────── FOOTER ───────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#111111', padding: '48px 48px 32px' }}>
      <div className="flex items-start justify-between">
        <div>
          <span
            className="block"
            style={{
              fontFamily: "'General Sans', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '0.12em',
              color: '#FFFFFF',
            }}
          >
            NUDGE
          </span>
        </div>

        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Contact', 'Twitter'].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[13px] text-[#9CA3AF] hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-[#6B7280] text-center mt-10">
        © 2025 Nudge
      </p>
    </footer>
  );
}

/* ───────────────────── LANDING PAGE ───────────────────── */
export function LandingPage() {
  return (
    <div
      id="landing-scroll"
      className="w-full h-screen overflow-y-auto"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF' }}
    >
      <Navbar />
      <Hero />
      <ModesSection />
      <TrustedCommunities />
      <FeaturesGrid />
      <FinalCTA />
      <Footer />
    </div>
  );
}