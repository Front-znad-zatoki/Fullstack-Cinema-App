import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export default function (req, res, next) {
  // Get token from header
  const token = req.cookies.access_token;
  // Check if not token, make anonymous order
  if (!token) {
    req.isAuthenticated = false;
    req.user = undefined;
    return next();
  }
  // Verify token
  try {
    jsonwebtoken.verify(
      token,
      config.get('jwtSecret'),
      (error, decoded) => {
        if (error) {
          req.isAuthenticated = false;
          req.user = undefined;
          return next();
        }
        req.isAuthenticated = true;
        req.user = decoded.user;
        next();
      },
    );
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}
