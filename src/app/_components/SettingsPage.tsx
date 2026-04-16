import { useState } from 'react';
import { User, Bell, Shield, Palette, Monitor, Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';

const FONT_HEADING = "'General Sans', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative shrink-0 transition-colors"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? '#7C3AED' : '#D1D5DB',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <span
        className="absolute top-0.5 transition-transform rounded-full"
        style={{
          width: 20,
          height: 20,
          background: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          left: checked ? 22 : 2,
          transition: 'left 0.15s ease',
        }}
      />
    </button>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between py-4"
      style={{ borderBottom: '1px solid var(--nudge-divider)' }}
    >
      <div className="flex-1 mr-4">
        <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--nudge-text-primary)' }}>{label}</p>
        {description && <p className="text-[12px] mt-0.5" style={{ color: 'var(--nudge-text-faint)' }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    matchFound: true,
    streakAlerts: true,
    weeklyDigest: false,
  });

  const { theme, setTheme } = useTheme();

  const [privacy, setPrivacy] = useState({
    showOnLeaderboard: true,
    showUniversity: true,
    allowMatching: true,
  });

  const sections = [
    {
      icon: <User size={20} color="#7C3AED" />,
      title: 'Profile',
      content: (
        <div className="flex flex-col">
          <SettingRow label="Display Name" description={user ? `${user.firstName} ${user.lastName}` : 'Not set'}>
            <button
              className="text-[13px] px-4 py-1.5 rounded-lg transition-colors"
              style={{ color: '#7C3AED', fontWeight: 500, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer' }}
            >
              Edit
            </button>
          </SettingRow>
          <SettingRow label="Username" description={user ? `@${user.userName}` : 'Not set'}>
            <button
              className="text-[13px] px-4 py-1.5 rounded-lg transition-colors"
              style={{ color: '#7C3AED', fontWeight: 500, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer' }}
            >
              Edit
            </button>
          </SettingRow>
          <SettingRow label="Email" description={user?.email ?? 'Not set'}>
            <span className="text-[12px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(22,163,74,0.12)', color: '#16A34A', fontWeight: 500 }}>
              Verified
            </span>
          </SettingRow>
          <SettingRow label="University" description={user?.university ?? 'Not set'}>
            <button
              className="text-[13px] px-4 py-1.5 rounded-lg transition-colors"
              style={{ color: '#7C3AED', fontWeight: 500, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', cursor: 'pointer' }}
            >
              Edit
            </button>
          </SettingRow>
        </div>
      ),
    },
    {
      icon: <Bell size={20} color="#F59E0B" />,
      title: 'Notifications',
      content: (
        <div className="flex flex-col">
          <SettingRow label="Session Reminders" description="Get notified before scheduled sessions">
            <ToggleSwitch checked={notifications.sessionReminders} onChange={(v) => setNotifications((n) => ({ ...n, sessionReminders: v }))} />
          </SettingRow>
          <SettingRow label="Match Found" description="Alert when a study partner is matched">
            <ToggleSwitch checked={notifications.matchFound} onChange={(v) => setNotifications((n) => ({ ...n, matchFound: v }))} />
          </SettingRow>
          <SettingRow label="Streak Alerts" description="Reminder to maintain your study streak">
            <ToggleSwitch checked={notifications.streakAlerts} onChange={(v) => setNotifications((n) => ({ ...n, streakAlerts: v }))} />
          </SettingRow>
          <SettingRow label="Weekly Digest" description="Summary of your weekly study progress">
            <ToggleSwitch checked={notifications.weeklyDigest} onChange={(v) => setNotifications((n) => ({ ...n, weeklyDigest: v }))} />
          </SettingRow>
        </div>
      ),
    },
    {
      icon: <Palette size={20} color="#3B82F6" />,
      title: 'Appearance',
      content: (
        <div className="flex flex-col">
          <SettingRow label="Theme" description="Choose your preferred color scheme">
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--nudge-surface-border)' }}>
              {([
                { value: 'light' as const, icon: <Sun size={14} />, label: 'Light' },
                { value: 'system' as const, icon: <Monitor size={14} />, label: 'System' },
                { value: 'dark' as const, icon: <Moon size={14} />, label: 'Dark' },
              ]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] transition-colors"
                  style={{
                    fontWeight: theme === opt.value ? 600 : 400,
                    color: theme === opt.value ? '#FFFFFF' : 'var(--nudge-text-muted)',
                    background: theme === opt.value ? '#7C3AED' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </SettingRow>
        </div>
      ),
    },
    {
      icon: <Shield size={20} color="#16A34A" />,
      title: 'Privacy',
      content: (
        <div className="flex flex-col">
          <SettingRow label="Show on Leaderboard" description="Display your name on the public leaderboard">
            <ToggleSwitch checked={privacy.showOnLeaderboard} onChange={(v) => setPrivacy((p) => ({ ...p, showOnLeaderboard: v }))} />
          </SettingRow>
          <SettingRow label="Show University" description="Display your university to study partners">
            <ToggleSwitch checked={privacy.showUniversity} onChange={(v) => setPrivacy((p) => ({ ...p, showUniversity: v }))} />
          </SettingRow>
          <SettingRow label="Allow Matching" description="Let Nudge match you with study partners">
            <ToggleSwitch checked={privacy.allowMatching} onChange={(v) => setPrivacy((p) => ({ ...p, allowMatching: v }))} />
          </SettingRow>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ fontFamily: FONT_BODY }}>
      <div className="flex-1 overflow-y-auto" style={{ background: 'var(--nudge-bg)', transition: 'background 0.2s ease' }}>
        <div className="mx-auto px-6 py-6" style={{ maxWidth: 700 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'var(--nudge-surface)', border: '1px solid var(--nudge-surface-border)', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} color="var(--nudge-text-secondary)" />
            </button>
            <h1 style={{ fontFamily: FONT_HEADING, fontSize: 28, fontWeight: 700, color: 'var(--nudge-text-primary)' }}>
              Settings
            </h1>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl"
                style={{
                  background: 'var(--nudge-surface)',
                  border: '1px solid var(--nudge-surface-border)',
                  boxShadow: 'var(--nudge-card-shadow)',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ borderBottom: '1px solid var(--nudge-surface-border)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--nudge-surface-hover)' }}
                  >
                    {section.icon}
                  </div>
                  <h2 style={{ fontFamily: FONT_HEADING, fontSize: 16, fontWeight: 700, color: 'var(--nudge-text-primary)' }}>
                    {section.title}
                  </h2>
                </div>
                <div className="px-6 pb-2">{section.content}</div>
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div
            className="rounded-xl mt-6 mb-8"
            style={{
              background: 'var(--nudge-surface)',
              border: '1px solid #FECACA',
              transition: 'background 0.2s ease',
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="text-[14px]" style={{ fontWeight: 600, color: '#EF4444' }}>
                  Delete Account
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--nudge-text-faint)' }}>
                  Permanently delete your account and all data. This cannot be undone.
                </p>
              </div>
              <button
                className="text-[13px] px-4 py-1.5 rounded-lg transition-colors"
                style={{ color: '#EF4444', fontWeight: 500, background: '#FEF2F2', border: '1px solid #FECACA', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
