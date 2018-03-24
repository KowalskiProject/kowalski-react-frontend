import { PAGE, ADD } from './resources';
import roles from './roles';

const rolesForResources = {};
rolesForResources[PAGE.PEOPLE] = [roles.ADMIN, roles.AUDITOR, roles.USER, roles.MANAGER];
rolesForResources[PAGE.TIMESHEET] = [roles.ADMIN, roles.AUDITOR, roles.USER, roles.MANAGER];
rolesForResources[PAGE.PROJECTS] = [roles.ADMIN, roles.AUDITOR, roles.USER, roles.MANAGER];
rolesForResources[ADD.PROJECT] = [roles.ADMIN, roles.MANAGER];
rolesForResources[ADD.PERSON] = [roles.ADMIN];
rolesForResources[ADD.PERSON_TO_PROJECT] = [roles.ADMIN, roles.MANAGER];
rolesForResources[ADD.TASK_TO_PROJECT] = [roles.ADMIN, roles.MANAGER];
rolesForResources[ADD.ACTIVITY_TO_PROJECT] = [roles.ADMIN, roles.MANAGER];
rolesForResources[ADD.TASK_FOR_ONESELF] = [roles.ADMIN, roles.MANAGER, roles.USER];

export const userCanAccess = (resource) => userHaveOneAuthorityOf(rolesForResources[resource]);

const userHaveOneAuthorityOf = (authList) => {
  const userAuthority = localStorage.getItem('currentUserAuths');
  if (!userAuthority) {
    return false;
  }
  const userAuthorities = typeof userAuthority === 'string'
    ? [userAuthority]
    : userAuthority;
  return authList.some((auth) => userAuthorities.includes(auth));
};

