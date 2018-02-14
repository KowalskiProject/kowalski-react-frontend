import request from '../../utils/request';

export function authenticate({ config: { baseUrl }, username, password }) {
  return request(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}
