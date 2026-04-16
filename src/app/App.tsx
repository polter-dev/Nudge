import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './_components/AuthProvider';
import { ThemeProvider } from './_components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
