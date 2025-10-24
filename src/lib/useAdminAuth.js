"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/check', {
          credentials: 'include',
        });

        if (!response.ok) {
          // Not authenticated, redirect to login
          const currentPath = window.location.pathname;
          router.push(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);
}
