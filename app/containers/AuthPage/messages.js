/*
 * AuthPage Messages
 *
 * This contains all the text for the AuthPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  friendlyIntroductoryMessage: { id: 'app.containers.AuthPage.friendlyIntroductoryMessage' },
  username: { id: 'app.containers.AuthPage.LoginForm.username' },
  password: { id: 'app.containers.AuthPage.LoginForm.password' },
  loginButton: { id: 'app.containers.AuthPage.LoginForm.loginButton' },
  signinButton: { id: 'app.containers.AuthPage.signInButton' },
  signupButton: { id: 'app.containers.AuthPage.signUpButton' },
  appTitle: { id: 'app.title' },
  pageTitle: { id: 'app.containers.AuthPage.pageTitle' },
  pageDescription: { id: 'app.containers.AuthPage.pageDescription' },
  version: {
    id: 'app.containers.AuthPage.version',
    values: {
      version: process.env.SATURNO_VERSION,
    },
  },
});
