import React from 'react';
import { Redirect } from 'react-router-dom';

export default function requireAuth(WrappedComponent) {
  return (props) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      return <Redirect to="/auth" />;
    }

    return <WrappedComponent {...props} />;
  };
}

