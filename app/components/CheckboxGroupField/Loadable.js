/**
 *
 * Asynchronously loads the component for CheckboxGroup
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
