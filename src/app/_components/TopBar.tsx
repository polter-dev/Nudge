import { useNavigate } from 'react-router';

export function TopBar({ linkToDashboard = false }: { linkToDashboard?: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[56px] flex items-center justify-center shrink-0" style={{ background: '#2D1B4E' }}>
      <span
        style={{
          fontFamily: "'General Sans', sans-serif",
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#5C17EC',
          cursor: linkToDashboard ? 'pointer' : 'default',
        }}
        onClick={() => linkToDashboard && navigate('/dashboard')}
      >
        NUDGE
      </span>
    </div>
  );
}
