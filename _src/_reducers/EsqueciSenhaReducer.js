const INITIAL_STATE = {
  cpf: ''
};

import {
  MODIFICA_CPF_ESQUECI_SENHA
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_CPF_ESQUECI_SENHA:
      return {...state, cpf: action.payload};
    default:
      return state;
  }
}
