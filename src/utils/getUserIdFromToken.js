// utils/getUserIdFromToken.js

import { verify } from 'jsonwebtoken';

export const getUserIdFromToken = (token) => {
  if (!token) {
    console.error('Token not provided');
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
