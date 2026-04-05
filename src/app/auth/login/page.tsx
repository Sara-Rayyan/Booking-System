'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { fetchAPI } from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { Navigation } from '../../../components/Navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      login(data);
      if (data.role === 'provider') router.push('/dashboard/provider');
      else if (data.role === 'admin') router.push('/dashboard/admin');
      else router.push('/dashboard/user');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
          {error && <p style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <Input 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Login</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
