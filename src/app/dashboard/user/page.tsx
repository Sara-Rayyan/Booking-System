'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigation } from '../../../components/Navigation';
import { Card } from '../../../components/ui/Card';
import { fetchAPI } from '../../../utils/api';
import io from 'socket.io-client';

export default function UserDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch existing requests logic...
    // E.g. fetchAPI(`/requests/user/${user._id}`) -> Need backend user route, 
    // BUT since we only made provider route, let's just make it a single endpoint or mock for now
    fetchAPI(`/requests/my-requests`, {}, user?.token).then(setRequests).catch(console.error);

    // 2. Realtime WebSocket listener
    const socket = io('http://localhost:5000');
    socket.on('status-update', (updatedReq: any) => {
      setRequests(prev => prev.map(r => r._id === updatedReq._id ? updatedReq : r));
    });

    return () => { socket.disconnect(); };
  }, [user]);

  if (!user) return <p>Please login first.</p>;

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Dashboard</h1>
        
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Active Queues</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {requests.map(req => (
            <Card key={req._id}>
              <h3>Booking at {req.placeId?.name || 'Service Center'}</h3>
              <p>Status: <strong>{req.status.toUpperCase()}</strong></p>
              {req.status !== 'completed' && req.status !== 'rejected' && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px' }}>
                  <p>Your Queue Number: <strong>#{req.queueNumber}</strong></p>
                  <p>Estimated Waiting Time: <strong>~{req.estimatedWaitTime} mins</strong></p>
                </div>
              )}
            </Card>
          ))}
          {requests.length === 0 && <p>No active bookings.</p>}
        </div>
      </div>
    </>
  );
}
