/**
 *
 * Asynchronously loads the component for OverlaySelectGroupHeader
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
