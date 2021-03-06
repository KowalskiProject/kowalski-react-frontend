import request from '../../utils/request';
import { queryString } from '../serializers/utils';

export function authenticate({ config: { baseUrl }, username, password }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return request(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    parseResponse: false,
    headers,
  });
}

export function getProjects({ config: { baseUrl }, token, params: { userId } = {} }) {
  return request(`${baseUrl}/projects${userId ? `?userId=${userId}` : ''}`, {
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

export function fetchRoles({ config: { baseUrl }, token }) {
  return request(`${baseUrl}/users/roles`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function deleteTimeRecord({ config: { baseUrl }, token, trId }) {
  return request(`${baseUrl}/timerecords/${trId}`, {
    method: 'DELETE',
    headers: generateCommonHeaders(token),
    parseResponse: false,
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

export function updateProject({ config: { baseUrl }, token, projectId, projectData }) {
  return request(`${baseUrl}/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
    headers: generateCommonHeaders(token),
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

export function createTask({ config: { baseUrl }, token, activityId, taskData }) {
  return request(`${baseUrl}/activities/${activityId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
    headers: generateCommonHeaders(token),
    parseResponse: true,
  });
}

export function addPeopleToProject({ config: { baseUrl }, token, projectId, peopleIds }) {
  return request(`${baseUrl}/projects/${projectId}/members`, {
    method: 'POST',
    body: JSON.stringify(peopleIds),
    headers: generateCommonHeaders(token),
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

export function getProjectActivities({ config: { baseUrl }, token, projectId, params }) {
  return request(`${baseUrl}/projects/${projectId}/activities?${params ? queryString(params) : ''}`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

export function saveTimeRecord({ config, token, timeRecordData }) {
  const trId = timeRecordData.get('trId');
  if (trId) {
    return updateTimeRecord({
      config,
      token,
      trId,
      timeRecordData: timeRecordData.delete('trId'),
    });
  }

  return createTimeRecord({ config, token, timeRecordData });
}

export function createTimeRecord({ config: { baseUrl }, token, timeRecordData }) {
  return request(`${baseUrl}/timerecords`, {
    method: 'POST',
    body: JSON.stringify(timeRecordData),
    headers: generateCommonHeaders(token),
  });
}

export function updateTimeRecord({ config: { baseUrl }, token, trId, timeRecordData }) {
  return request(`${baseUrl}/timerecords/${trId}`, {
    method: 'PUT',
    body: JSON.stringify(timeRecordData),
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

export function fetchTimeRecords({ config: { baseUrl }, token, userId, params }) {
  return request(`${baseUrl}/users/${userId}/timerecords?${params ? queryString(params) : ''}`, {
    method: 'GET',
    headers: generateCommonHeaders(token),
  });
}

function generateCommonHeaders(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');
  return headers;
}
