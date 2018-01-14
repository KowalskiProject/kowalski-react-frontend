/**
 *
 * Asynchronously loads the component for TimesheetPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
