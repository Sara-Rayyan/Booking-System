'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--surface-border)'
    }}>
      <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
        SmartBooking
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hello, {user.name}</span>
            <Link href={`/dashboard/${user.role}`}>
              <Button variant="secondary" style={{ padding: '0.5rem 1rem' }}>Dashboard</Button>
            </Link>
            <Button onClick={logout} variant="danger" style={{ padding: '0.5rem 1rem' }}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
