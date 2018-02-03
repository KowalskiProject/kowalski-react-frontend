/*
 *
 * ProjectsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
} from './constants';

const initialState = fromJS({
  // projects: [],
  projects: [
    {
      name: 'Projeto de Testes A',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!',
    },
    {
      name: 'Projeto de Testes B',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!',
    },
    {
      name: 'Projeto de Testes C',
      description: 'Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Cevadis im ampola pa arma uma pindureta. Si num tem leite então bota uma pinga aí cumpadi!',
    },
  ],
  projectFormOpen: false,
});

function projectsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case OPEN_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', true);
    case CLOSE_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', false);
    default:
      return state;
  }
}

export default projectsPageReducer;
