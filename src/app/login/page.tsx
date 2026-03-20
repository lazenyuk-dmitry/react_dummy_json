'use client';

import { SubmitEvent, useState } from 'react';
import styles from './page.module.scss';
import { Input, Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isLoasing, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const validate = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (form.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      try {
        setIsLoading(true);
        await login(form);
        setApiError('');
      } catch (e) {
        if (e instanceof AxiosError) {
          setApiError(e.response?.data.message);
        }
        throw e;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className='page-section'>
      <div className='container'>
        <h2 className='text-center'>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={form.username}
            error={errors.username}
            disabled={isLoasing}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Password"
            value={form.password}
            error={errors.password}
            disabled={isLoasing}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {apiError &&
            <div className={styles.loginError}>
              {apiError}
            </div>
          }
          <Button type="submit" isLoading={isLoasing}>Login</Button>
        </form>
      </div>
    </section>
  );
}
