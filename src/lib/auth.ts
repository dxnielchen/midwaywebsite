import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'midway-admin-secret-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'midway2024';

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createToken(): string {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
