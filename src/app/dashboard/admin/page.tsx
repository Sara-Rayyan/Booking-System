'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigation } from '../../../components/Navigation';
import { Card } from '../../../components/ui/Card';
import { fetchAPI } from '../../../utils/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAPI('/places').then(setPlaces).catch(console.error);
    }
  }, [user]);

  if (!user || user.role !== 'admin') return <p>Admin Access Only</p>;

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Administration Panel</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div>
            <Card>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Global Analytics</h2>
              <p>Total Registered Places: {places.length}</p>
              <p>Active Users: ~342</p>
              <p>Total Appointments: ~1.2k</p>
            </Card>
          </div>
          
          <div>
            <Card>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>System Places & Categories</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <th style={{ padding: '0.5rem' }}>Name</th>
                    <th style={{ padding: '0.5rem' }}>Category</th>
                    <th style={{ padding: '0.5rem' }}>Rating</th>
                    <th style={{ padding: '0.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map(place => (
                    <tr key={place._id} style={{ borderBottom: '1px dotted var(--surface-border)' }}>
                      <td style={{ padding: '0.5rem' }}>{place.name}</td>
                      <td style={{ padding: '0.5rem', textTransform: 'capitalize' }}>{place.category}</td>
                      <td style={{ padding: '0.5rem' }}>{place.rating}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <button style={{ color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer' }}>Edit</button> | 
                        <button style={{ color: 'var(--accent)', border: 'none', background: 'none', cursor: 'pointer' }}> Delete</button>
                      </td>
                    </tr>
                  ))}
                  {places.length === 0 && <tr><td colSpan={4} style={{ padding: '1rem' }}>No places found. Add some places!</td></tr>}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
