const INITIAL_STATE = {
  cpf: '',
  senha: ''
};

import {
  AUTENTICACAO_SUCESSO,
  SAIR
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTENTICACAO_SUCESSO:
      return {...state, cpf: action.payload.result.cpf, senha: action.payload.senha}
    case SAIR:
      return INITIAL_STATE;
    default:
      return state
  }
}
