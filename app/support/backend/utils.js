import { SERVER_BASE_URL } from '../../utils/constants';

export const genCommonReqConfig = () => ({
  config: { baseUrl: SERVER_BASE_URL },
  token: localStorage.getItem('authToken'),
});

export const isAuthError = (e) => {
  if (e.response && e.response.status) {
    if (e.response.status === 403) {
      return true;
    }
  }

  return false;
};
