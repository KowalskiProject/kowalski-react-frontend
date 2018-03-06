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
    headers: generateCommonHeaders(token),
  });
}

export function getProject({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function createProject({ config: { baseUrl }, token, projectData }) {
  return request(`${baseUrl}/projects`, {
    method: 'POST',
    body: JSON.stringify(projectData),
    headers: generateCommonHeaders(token),
    parseResponse: false,
  });
}

export function createActivity({ config: { baseUrl }, token, projectId, activityData }) {
  return request(`${baseUrl}/projects/${projectId}/activities`, {
    method: 'POST',
    body: JSON.stringify(activityData),
    headers: generateCommonHeaders(token),
    parseResponse: false,
  });
}

export function addPeopleToProject({ config: { baseUrl }, token, projectId, peopleIds }) {
  return request(`${baseUrl}/projects/${projectId}/members`, {
    method: 'POST',
    body: JSON.stringify(peopleIds),
    headers: generateCommonHeaders(token),
    parseResponse: false,
  });
}

export function getProjectMembers({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/members`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function getActivityTasks({ config: { baseUrl }, token, activityId }) {
  return request(`${baseUrl}/activities/${activityId}/tasks`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function getProjectAccountable({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/accountable`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function getProjectActivities({ config: { baseUrl }, token, projectId }) {
  return request(`${baseUrl}/projects/${projectId}/activities`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function getPeople({ config: { baseUrl }, token }) {
  return request(`${baseUrl}/users`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function registerPerson({ config: { baseUrl }, token, personData }) {
  return request(`${baseUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(personData),
    headers: generateCommonHeaders(token),
    parseResponse: false,
  });
}

function generateCommonHeaders(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');
  return headers;
}
