import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export default function (req, res, next) {
  // Get token from stored cookies
  const token = req.cookies.access_token;
  // Check: if not token, make anonymous order
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
        // if token is not valid, proceed anonymously
        if (error) {
          req.isAuthenticated = false;
          req.user = undefined;
          return next();
        }
        // else proceed authenticated
        req.isAuthenticated = true;
        req.user = decoded.user;
        next();
      },
    );
  } catch (err) {
    console.error('something wrong with order middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}
