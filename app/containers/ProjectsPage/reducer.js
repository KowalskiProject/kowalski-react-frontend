/*
 *
 * ProjectsPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  DEFAULT_ACTION,
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
  NEW_PROJECT_SAVED,
  SUBMIT_NEW_PROJECT_FORM,
  SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
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
  isSubmittingNewProjectForm: false,
});

function projectsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case OPEN_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', true);
    case CLOSE_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', false);
    case SUBMIT_NEW_PROJECT_FORM:
    case SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT:
      return state.set('isSubmittingNewProjectForm', true);
    case NEW_PROJECT_SAVED:
      return state
        .set('isSubmittingNewProjectForm', false)
        .set('projects', (state.get('projects') || List()).push(payload));
    default:
      return state;
  }
}

export default projectsPageReducer;
