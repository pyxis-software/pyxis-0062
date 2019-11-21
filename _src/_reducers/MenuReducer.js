const INITIAL_STATE = {
  cpf: ''
};

import {
  AUTENTICACAO_SUCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTENTICACAO_SUCESSO:
      return {...state, cpf: action.payload.result.cpf}
    default:
      return state
  }
}
