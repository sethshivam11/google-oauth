import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

try {
  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser(async (id, next) => {
    try {
      const user = await User.findById(id);
      if (user) next(null, user);
      else
        next(
          {
            status: 404,
            message: "User not found",
          },
          null
        );
    } catch (error) {
      next(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_, __, profile, next) => {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          next(null, user);
        } else {
          const createdUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: `${profile.emails[0].value}`,
          });
          if (createdUser) next(null, createdUser);
          else
            next(
              {
                status: 400,
                message: "User not created",
              },
              null
            );
        }
      }
    )
  );
} catch (error) {
  console.log("Passport error", error);
}
