import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'Smart Service Booking',
  description: 'A modern platform for clinics, banks, and bakeries. Book services, join queues, and receive real-time notifications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="app-container">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
