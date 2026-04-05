'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigation } from '../../../components/Navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { fetchAPI } from '../../../utils/api';
import io from 'socket.io-client';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    
    // We fetch requests for the provider's places
    fetchAPI(`/requests?placeId=my_place_id`, {}, user.token).then(setRequests).catch(console.error);

    const socket = io('http://localhost:5000');
    socket.on('new-request', (newReq: any) => {
      setRequests(prev => [...prev, newReq]);
    });

    return () => { socket.disconnect(); };
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const updated = await fetchAPI(`/requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      }, user?.token);
      setRequests(prev => prev.map(r => r._id === id ? updated : r));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'provider') return <p>Access Denied</p>;

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Provider Center</h1>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {requests.map(req => (
            <Card key={req._id}>
              <h3>Patient/User: {req.userId?.name || 'Unknown'}</h3>
              <p>Service: {req.serviceType}</p>
              {req.details?.painLevel && <p style={{ color: 'var(--accent)' }}>Pain: {req.details.painLevel}</p>}
              <p>Status: {req.status}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button onClick={() => updateStatus(req._id, 'accepted')}>Accept</Button>
                <Button variant="danger" onClick={() => updateStatus(req._id, 'rejected')}>Reject</Button>
                <Button variant="secondary" onClick={() => updateStatus(req._id, 'completed')}>Complete</Button>
              </div>
            </Card>
          ))}
          {requests.length === 0 && <p>Queue is empty.</p>}
        </div>
      </div>
    </>
  );
}
