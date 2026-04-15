import { Outlet } from 'react-router';
import { TopBar } from './TopBar';
import { PageTransition } from './PageTransition';

export function AppShell() {
  return (
    <div
      className="w-full flex flex-col"
      style={{ height: '100vh', minHeight: 900 }}
    >
      <TopBar linkToDashboard />
      <div className="flex flex-1 overflow-hidden">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
}