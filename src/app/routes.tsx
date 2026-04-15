import { createBrowserRouter } from 'react-router';
import { LandingPage } from './_components/LandingPage';
import { SignUpScreen } from './_components/SignUpScreen';
import { LoginScreen } from './_components/LoginScreen';
import { WhyNudgePage } from './_components/WhyNudgePage';
import { AboutUsPage } from './_components/AboutUsPage';
import { FeaturesPage } from './_components/FeaturesPage';
import { AppShell } from './_components/AppShell';
import { DashboardScreen } from './_components/DashboardScreen';
import { MatchmakingScreen } from './_components/MatchmakingScreen';
import { SoloSessionScreen } from './_components/SoloSessionScreen';
import { PairedSessionScreen } from './_components/PairedSessionScreen';
import { SessionSummaryScreen } from './_components/SessionSummaryScreen';

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/signup', Component: SignUpScreen },
  { path: '/login', Component: LoginScreen },
  { path: '/why-nudge', Component: WhyNudgePage },
  { path: '/about', Component: AboutUsPage },
  { path: '/features', Component: FeaturesPage },

  {
    Component: AppShell,
    children: [
      { path: '/dashboard', Component: DashboardScreen },
      { path: '/matchmaking', Component: MatchmakingScreen },
      { path: '/solo', Component: SoloSessionScreen },
      { path: '/session', Component: PairedSessionScreen },
      { path: '/summary', Component: SessionSummaryScreen },
    ],
  },
]);
