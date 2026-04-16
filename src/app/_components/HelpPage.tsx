import { useState } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Users,
  Zap,
  Trophy,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const FONT_HEADING = "'General Sans', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

interface FaqItem {
  question: string;
  answer: string;
}

const categories = [
  {
    icon: <BookOpen size={22} color="#7C3AED" />,
    title: 'Getting Started',
    description: 'New to Nudge? Start here.',
    faqs: [
      {
        question: 'What is Nudge?',
        answer: 'Nudge is a study platform that pairs verified college students for live, structured study sessions. We use the concept of "body doubling" — having someone else present while you work — to help you stay focused and productive.',
      },
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign Up" and enter your details. You\'ll need a valid .edu email address to verify you\'re a college student. After filling in your info, you\'ll verify through your university\'s Microsoft account.',
      },
      {
        question: 'Is Nudge free?',
        answer: 'Yes! Nudge is completely free for all verified college students. We believe every student deserves access to tools that help them succeed.',
      },
    ],
  },
  {
    icon: <Users size={22} color="#3B82F6" />,
    title: 'Study Sessions',
    description: 'How sessions work.',
    faqs: [
      {
        question: 'How does matching work?',
        answer: 'When you click "Find a Partner," Nudge matches you with another student who\'s also looking to study. Matching considers factors like study preferences and availability to find you the best partner.',
      },
      {
        question: 'What happens during a session?',
        answer: 'Sessions follow a structured Plan → Lock-in → Review cycle. First you set your goals (Plan), then you focus on your work (Lock-in), and finally you review what you accomplished (Review). This cycle repeats for each round.',
      },
      {
        question: 'Can I study solo?',
        answer: 'Absolutely! Choose "Study Solo" from the dashboard to start a focused session on your own with the same structured format. Solo sessions still count toward your streak and Nudge Points.',
      },
    ],
  },
  {
    icon: <Zap size={22} color="#F59E0B" />,
    title: 'Focus & Productivity',
    description: 'Tips and features.',
    faqs: [
      {
        question: 'What is a Focus Score?',
        answer: 'Your Focus Score measures how well you stayed on task during a session. It\'s calculated based on session completion, task progress, and consistency. Scores range from 0-100%, with higher scores indicating better focus.',
      },
      {
        question: 'How do streaks work?',
        answer: 'Complete at least one study session per day to maintain your streak. Streaks are a great way to build consistent study habits. The longer your streak, the more Nudge Points you earn per session.',
      },
      {
        question: 'What are Nudge Points?',
        answer: 'Nudge Points are earned by completing sessions, maintaining streaks, and hitting milestones. They\'re displayed on your profile and the leaderboard. Points are a fun way to track your overall engagement.',
      },
    ],
  },
  {
    icon: <Trophy size={22} color="#16A34A" />,
    title: 'Leaderboard & Stats',
    description: 'Rankings and achievements.',
    faqs: [
      {
        question: 'How is the leaderboard ranked?',
        answer: 'The leaderboard ranks students by total study hours. You can view All Time, Weekly, and Monthly rankings. Your position is highlighted so you can easily spot yourself.',
      },
      {
        question: 'Can I hide my name from the leaderboard?',
        answer: 'Yes! Go to Settings → Privacy and toggle off "Show on Leaderboard." Your study data will still be tracked for your personal stats, but you won\'t appear in public rankings.',
      },
    ],
  },
];

function FaqAccordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #F3F4F6' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span className="text-[14px] pr-4" style={{ fontWeight: 500, color: '#111' }}>
          {item.question}
        </span>
        {open ? (
          <ChevronUp size={16} color="#9CA3AF" className="shrink-0" />
        ) : (
          <ChevronDown size={16} color="#9CA3AF" className="shrink-0" />
        )}
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-[13px] text-[#6B7280] leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function HelpPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = searchQuery
    ? categories
        .map((cat) => ({
          ...cat,
          faqs: cat.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.faqs.length > 0)
    : categories;

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ fontFamily: FONT_BODY }}>
      <div className="flex-1 overflow-y-auto" style={{ background: '#F9FAFB' }}>
        <div className="mx-auto px-6 py-6" style={{ maxWidth: 700 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} color="#374151" />
            </button>
            <h1 style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: '#111111' }}>
              Help Center
            </h1>
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 mb-8"
            style={{
              height: 48,
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Search size={18} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-[14px] bg-transparent"
              style={{ color: '#111', fontFamily: FONT_BODY }}
            />
          </div>

          {/* Category cards (when not searching) */}
          {!searchQuery && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => {
                    const el = document.getElementById(`help-${cat.title}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex items-center gap-3 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: '#F9FAFB' }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <p className="text-[14px]" style={{ fontWeight: 600, color: '#111' }}>
                      {cat.title}
                    </p>
                    <p className="text-[12px] text-[#9CA3AF]">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* FAQ sections */}
          <div className="flex flex-col gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.title}
                id={`help-${cat.title}`}
                className="rounded-xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: '#F9FAFB' }}
                  >
                    {cat.icon}
                  </div>
                  <h2 style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: '#111' }}>
                    {cat.title}
                  </h2>
                </div>
                <div className="px-6">
                  {cat.faqs.map((faq) => (
                    <FaqAccordion key={faq.question} item={faq} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact support */}
          <div
            className="rounded-xl mt-8 mb-8 p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
              border: '1px solid #E9D5FF',
            }}
          >
            <MessageCircle size={32} color="#7C3AED" className="mx-auto mb-3" />
            <h3
              style={{ fontFamily: FONT_HEADING, fontSize: 18, fontWeight: 700, color: '#111' }}
            >
              Still need help?
            </h3>
            <p className="text-[14px] text-[#6B7280] mt-1 mb-4">
              Our support team is here to help you succeed.
            </p>
            <button
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-[14px] text-white transition-colors"
              style={{ background: '#7C3AED', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#6D28D9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#7C3AED'; }}
            >
              Contact Support <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
