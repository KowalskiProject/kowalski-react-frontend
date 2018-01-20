/**
 *
 * Asynchronously loads the component for TextAreaInput
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
