import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Here you would typically:
                // 1. Check if user exists in your database
                // 2. If not, create new user
                // 3. Return user object
                return done(null, profile);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;