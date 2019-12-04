const INITIAL_STATE = {
  dados: [],
  carregamento: true
};

import {
  MOSTRAR_INFORMACOES_EMPRESA
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOSTRAR_INFORMACOES_EMPRESA:
      return {...state, dados: action.payload.result, carregamento: false}
    default:
      return state
  }
}
