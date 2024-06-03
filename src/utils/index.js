import jwt from 'jsonwebtoken';

export const isEmail = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const isVietNamPhoneNumber = (phone) => {
  const vietnamesePhoneNumberRegex = /^(0[2-9]|1[2-9])[0-9]{8}$/;
  return vietnamesePhoneNumberRegex.test(phone);
};

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '2d' });
  return accessToken;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
  return refreshToken;
};

export const isTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const getToken = (req) => req.headers.authorization?.split(' ')[1];
