import Link from 'next/link';
import { Card } from '../components/ui/Card';
import { Navigation } from '../components/Navigation';

export default function Home() {
  const categories = [
    { id: 'clinic', title: 'Clinics & Hospitals', icon: '🏥', desc: 'Smart triage & medical appointments' },
    { id: 'bank', title: 'Banking Services', icon: '🏦', desc: 'Skip the line, book bank services' },
    { id: 'bakery', title: 'Bakeries', icon: '🥖', desc: 'Pre-order freshly baked goods' }
  ];

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Smart Service <span style={{ color: 'var(--primary)' }}>Booking</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Skip the wait. Book appointments, pre-order items, and track your real-time queue status from anywhere.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {categories.map((cat) => (
            <Link href={`/${cat.id}`} key={cat.id}>
              <Card className="hover-lift" style={{ height: '100%', textAlign: 'left' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{cat.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
