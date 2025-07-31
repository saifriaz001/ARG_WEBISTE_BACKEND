// utils/tokenBlacklist.js
const tokenBlacklist = new Set();

export const addToBlacklist = (token) => {
  tokenBlacklist.add(token);

  // Auto-remove after 24h (or token TTL)
  setTimeout(() => {
    tokenBlacklist.delete(token);
  }, 24 * 60 * 60 * 1000); // 1 day
};

export const isBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};
