const INITIAL_STATE = {
  mensagem: '',
  cpf: '',
  nome: '',
  email: ''
};

import {
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM_SUCESSO,
  AUTENTICACAO_SUCESSO,
  SAIR
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_MENSAGEM:
      return {...state, mensagem: action.payload}
    case ENVIA_MENSAGEM_SUCESSO:
      return {...state, mensagem: ''}
    case AUTENTICACAO_SUCESSO:
      return {...state,
        cpf: action.payload.result.cpf,
        nome: action.payload.result.nome,
        email: action.payload.result.email
      }
    case SAIR:
      return INITIAL_STATE;
    default:
      return state
  }
}
