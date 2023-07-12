import express, {Application,} from "express";
import passport from "passport";
import {OAuth2Strategy} from "passport-google-oauth";

let userProfile: any;
export const initializeAuth = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj: any, cb) => {
    cb(null, obj);
  });

  passport.use(new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      userProfile = profile;
      return done(null, userProfile);
    }
  ));

  app.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/error', successRedirect: '/success'}),
    (req, res) => {
      res.redirect('success');
    }
  );

  app.get('/success', (req: express.Request & { session: any }, res) => {
    if (userProfile) {
      req.session.user = {
        id: userProfile.id,
        displayName: userProfile.displayName,
        photo: userProfile.photos?.length > 0 ? userProfile.photos[0].value : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      };
      res.render('success', {user: userProfile});
    } else {
      res.redirect('/error');
    }
  });

  app.get('/error', (req, res) => res.send('error logging in'))

}