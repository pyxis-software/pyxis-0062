const INITIAL_STATE = {
  cpf: '',
  senha: '',
  erro: false,
  mensagem: '',
  carregamentoInicial: false
};

import {
  MODIFICA_CPF,
  MODIFICA_SENHA,
  AUTENTICACAO_ERRO,
  AUTENTICACAO_SUCESSO,
  LOGIN_ANDAMENTO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_CPF:
      return {...state, cpf: action.payload};
    case MODIFICA_SENHA:
      return {...state, senha: action.payload}
    case AUTENTICACAO_ERRO:
      return {...state, erro: true, mensagem: action.payload, carregamentoInicial: false}
    case AUTENTICACAO_SUCESSO:
      return {...state, ...INITIAL_STATE, erro: false}
    case LOGIN_ANDAMENTO:
      return {...state, carregamentoInicial: true}
    default:
      return state;
  }
}
