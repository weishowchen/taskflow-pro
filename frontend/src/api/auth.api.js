import client from './client';

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {{ token: string, user: object }}
 */
export async function login(credentials) {
  const response = await client.post('/auth/login', credentials);
  return response.data.data;
}

export async function logout() {
  await client.post('/auth/logout');
}
