/**
 * Secure Admin Authentication Utilities
 * Manages admin session tokens and API authorization headers
 */

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem('kr_admin_token') || sessionStorage.getItem('kr_admin_token');
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  try {
    localStorage.setItem('kr_admin_token', token);
    sessionStorage.setItem('kr_admin_token', token);
    localStorage.setItem('kr_admin_auth', 'true');
  } catch {
    // Ignore storage errors in private/incognito modes
  }
}

export function clearAdminAuth(): void {
  try {
    localStorage.removeItem('kr_admin_token');
    localStorage.removeItem('kr_admin_auth');
    sessionStorage.removeItem('kr_admin_token');
  } catch {
    // Ignore storage errors
  }
}

export function getAdminAuthHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const token = getAdminToken();
  const headers: Record<string, string> = { ...extraHeaders };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function verifyAdminAuthSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) {
    clearAdminAuth();
    return false;
  }
  try {
    const res = await fetch('/api/admin/auth-check', {
      headers: getAdminAuthHeaders(),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.authenticated) {
        return true;
      }
    }
    clearAdminAuth();
    return false;
  } catch {
    return false;
  }
}
