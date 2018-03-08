/**
 *
 * Asynchronously loads the component for PeopleFlexGrid
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
