'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { Input, Button } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/PageLoader';
import { LoginRequest, ValidatorConfig } from '@/types';
import { validate } from '@/utils/validatator';
import styles from './page.module.scss';

export default function LoginPage() {
  const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
  const [errors, setErrors] = useState<Record<keyof LoginRequest, string>>({ username: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isLoasing, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const isAuth = useAuthStore((state) => state.isAuth);

  const router = useRouter();

  const fieldsConfig: Record<keyof LoginRequest, ValidatorConfig> = {
    username: { fieldName: 'Username', minLength: 3 },
    password: { fieldName: 'Password', minLength: 3 },
  }

  useEffect(() => {
    if (!isInitializing && isAuth) {
      router.replace('/');
    }
  }, [isAuth, isInitializing, router]);

  const validateForm = () => {
    const userNameResult = validate(form.username, fieldsConfig.username);
    const passwordResult = validate(form.password, fieldsConfig.password);

    setErrors({
      username: userNameResult.message,
      password: passwordResult.message,
    });

    return userNameResult.isValid && passwordResult.isValid;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
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

  if (isInitializing) {
    return <PageLoader />
  }

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
            type='password'
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
