'use client';
import { useState } from 'react';
// import styles from './Login.module.scss';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username.length < 3 || form.password.length < 3) {
      setError('Minimum 3 characters required');
      return;
    }
    setError('');
    console.log('Logging in with:', form);
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.formCard}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
