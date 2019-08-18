const INITIAL_STATE = {
  cpf: '',
  senha: ''
};

import {
  FAZER_LOGIN
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAZER_LOGIN:
      return {...state, cpf: true, senha: true};
    default:
      return state;
  }
}
