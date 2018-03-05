/**
 *
 * Asynchronously loads the component for TaskSelectionField
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
