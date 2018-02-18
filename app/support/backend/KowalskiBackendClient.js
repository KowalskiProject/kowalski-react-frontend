import request from '../../utils/request';

export function authenticate({ config: { baseUrl }, username, password }) {
  return request(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    parseResponse: false,
  });
}

export function getProjects({ config: { baseUrl }, token }) {
  return request(`${baseUrl}/projects`, {
    method: 'GET',
    headers: generateAuthHeader(token),
  });
}

export function getProject({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}`, {
    method: 'GET',
    headers: generateAuthHeader(token),
  });
}

export function getProjectMembers({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/members`, {
    method: 'GET',
    headers: generateAuthHeader(token),
  });
}

export function getProjectAccountable({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/accountable`, {
    method: 'GET',
    headers: generateAuthHeader(token),
  });
}

export function getProjectActivities({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/activities`, {
    method: 'GET',
    headers: generateAuthHeader(token),
  });
}

function generateAuthHeader(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  return headers;
}
