// lib/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/admin';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Local strategy for login
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

// JWT strategy for protected routes
passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      else return done(null, false);
    } catch (err) {
      done(err, false);
    }
  }
));

export default passport;
