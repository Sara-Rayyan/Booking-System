'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Navigation } from '../../../components/Navigation';
import { fetchAPI } from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';

export default function PlacePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [place, setPlace] = useState<any>(null);
  const [serviceType, setServiceType] = useState('');
  const [painLevel, setPainLevel] = useState('None');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAPI(`/places/${params.placeId}`)
      .then(data => setPlace(data))
      .catch(console.error);
  }, [params.placeId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to book a service');
      router.push('/auth/login');
      return;
    }
    try {
      await fetchAPI('/requests', {
        method: 'POST',
        body: JSON.stringify({
          placeId: place._id,
          serviceType: serviceType || place.services[0],
          details: {
            painLevel: params.category === 'clinic' ? painLevel : 'None',
            description
          }
        })
      }, user.token);
      alert('Booking successful! Redirecting to Dashboard...');
      router.push('/dashboard/user');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!place) return <div style={{ padding: '2rem' }}>Loading place details...</div>;

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{place.name}</h1>
          <p style={{ color: 'var(--text-muted)' }}>{place.description}</p>
          <p style={{ margin: '1rem 0' }}><strong>Working Hours:</strong> {place.workingHours}</p>
          
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Book a Service</h2>
            <form onSubmit={handleBooking}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Select Service</label>
                <select className="input-modern" value={serviceType} onChange={e => setServiceType(e.target.value)}>
                  {place.services.map((s: string) => <option key={s} value={s}>{s}</option>)}
                  {place.services.length === 0 && <option value="General">General Service</option>}
                </select>
              </div>

              {params.category === 'clinic' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Smart Triage: Pain Level</label>
                  <select className="input-modern" value={painLevel} onChange={e => setPainLevel(e.target.value)}>
                    <option value="Mild">Mild</option>
                    <option value="Severe">Severe</option>
                    <option value="Very Severe">Very Severe</option>
                  </select>
                </div>
              )}

              <Input 
                label="Additional Notes / Description" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Write your symptoms or specific requests here..."
              />

              <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Confirm Booking</Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}
