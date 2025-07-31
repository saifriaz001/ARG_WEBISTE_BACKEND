// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import { isBlacklisted } from '../utilis/tokenBlacklist.js';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token.' });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ success: false, message: 'Token has been revoked. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
