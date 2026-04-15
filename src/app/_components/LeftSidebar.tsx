import {
  Pause,
  User,
  Settings,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

const icons = [
  { Icon: Pause, id: 'pause' },
  { Icon: User, id: 'profile' },
  { Icon: Settings, id: 'settings' },
  { Icon: MessageCircle, id: 'chat', hasNotification: true },
  { Icon: HelpCircle, id: 'help' },
];

const activeId = 'settings';

export function LeftSidebar() {
  return (
    <div
      className="w-[56px] shrink-0 flex flex-col items-center pt-5 pb-5"
      style={{
        background: '#2D1B4E',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {icons.map(({ Icon, id, hasNotification }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: isActive ? '#7C3AED' : 'transparent',
              }}
            >
              <Icon
                size={20}
                color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)'}
                strokeWidth={1.8}
              />
              {hasNotification && (
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                  style={{ background: '#7C3AED', border: '2px solid #2D1B4E' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
