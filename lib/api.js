// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000' || "https://portfolio-server-five-theta.vercel.app";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-five-theta.vercel.app";

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}

export const api = {
  get: (path) => apiFetch(path),
  post: (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiFetch(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => apiFetch(path, { method: 'DELETE' }),
  upload: (path, formData) => {
    const token = getToken();
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      body: formData,
      headers,
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || 'Upload failed');
      }
      return res.json();
    });
  },
};
