/**
 *
 * Asynchronously loads the component for PeoplePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
