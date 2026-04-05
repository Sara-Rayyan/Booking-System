'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { fetchAPI } from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { Navigation } from '../../../components/Navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      login(data);
      if (data.role === 'provider') router.push('/dashboard/provider');
      else router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
          {error && <p style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          <form onSubmit={handleRegister}>
            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem' }}>Account Type</label>
              <select className="input-modern" value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Customer</option>
                <option value="provider">Service Provider</option>
              </select>
            </div>

            <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Register</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
