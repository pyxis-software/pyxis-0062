const INITIAL_STATE = {
  dados: [],
  indicadorNoticias: true
};

import {
  MOSTRAR_NOTICIAS_SUCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOSTRAR_NOTICIAS_SUCESSO:
      return {...state, dados: action.payload, indicadorNoticias: false}
    default:
      return state
  }
}
