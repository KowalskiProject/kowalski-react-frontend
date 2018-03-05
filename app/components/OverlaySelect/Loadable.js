/**
 *
 * Asynchronously loads the component for OverlaySelect
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
