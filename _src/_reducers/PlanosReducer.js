const INITIAL_STATE = {
  cpf: '',
  dados: [],
  carregamento: true
};

import {
  AUTENTICACAO_SUCESSO,
  MOSTRAR_PLANOS_SUCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTENTICACAO_SUCESSO:
      return {...state, cpf: action.payload.result.cpf}
    case MOSTRAR_PLANOS_SUCESSO:
      return {...state, dados: action.payload.planos, carregamento: false}
    default:
      return state
  }
}
