'use client';

import { SubmitEvent, useState } from 'react';
import styles from './page.module.scss';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.username.length < 3 || form.password.length < 3) {
      setError('Minimum 3 characters required');
      return;
    }
    setError('');
    login(form);
  };

  return (
    <section className='page-section'>
      <div className='container'>
        <h2 className='text-center'>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </section>
  );
}
