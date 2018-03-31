/*
 * AuthPage Messages
 *
 * This contains all the text for the AuthPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  friendlyIntroductoryMessage: {
    id: 'app.containers.AuthPage.friendlyIntroductoryMessage',
    defaultMessage: 'Your best friend to help in daily management tasks.',
  },
  username: {
    id: 'app.containers.AuthPage.LoginForm.username',
    defaultMessage: 'Username',
  },
  password: {
    id: 'app.containers.AuthPage.LoginForm.password',
    defaultMessage: 'Password',
  },
  loginButton: {
    id: 'app.containers.AuthPage.LoginForm.loginButton',
    defaultMessage: 'LOGIN',
  },
  signinButton: {
    id: 'app.containers.AuthPage.signInButton',
    defaultMessage: 'Sign In',
  },
  signupButton: {
    id: 'app.containers.AuthPage.signUpButton',
    defaultMessage: 'Sign Up',
  },
  appTitle: {
    id: 'app.title',
  },
  pageTitle: {
    id: 'app.containers.AuthPage.pageTitle',
    defaultMessage: 'Sign In',
  },
  pageDescription: {
    id: 'app.containers.AuthPage.pageDescription',
    defaultMessage: 'Auntheticate in the system',
  },
  version: {
    id: 'app.containers.AuthPage.version',
    defaultMessage: 'Version {version}',
    values: {
      version: process.env.SATURNO_VERSION,
    },
  },
});
