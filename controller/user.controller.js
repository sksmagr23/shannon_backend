import { asyncHandler } from "../utils/asyncHandler.js";
import passport from "passport";
export const googleLogin = asyncHandler(async (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res); // Redirects to Google login
});

export const googleCallback = asyncHandler(async (req, res) => {
    passport.authenticate('google', {successRedirect: 'http://localhost:3000/login',failureRedirect: 'http://localhost:3000/login' }, async (err, user, info) => {
        if (err || !user) {
            throw new ErrorResponse(401, "User not authenticated via Google");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .json((200, { user, accessToken, refreshToken }, "User logged in via Google successfully"));
    })(req, res);
});