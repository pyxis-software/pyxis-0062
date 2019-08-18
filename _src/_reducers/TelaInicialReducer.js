const INITIAL_STATE = {
  cpf: '',
  senha: ''
};

import {
  MODIFICA_CPF,
  MODIFICA_SENHA
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_CPF:
      return {...state, cpf: action.payload};
    case MODIFICA_SENHA:
      return {...state, senha: action.payload}
    default:
      return state;
  }
}
