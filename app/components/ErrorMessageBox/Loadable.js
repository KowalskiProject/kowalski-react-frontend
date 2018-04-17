/**
 *
 * Asynchronously loads the component for ErrorMessageBox
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
