const INITIAL_STATE = {
  cpf: '',
  mensagemRecupera: '',
  carregamento: true,
  mostraMensagem: false
};

import {
  MODIFICA_CPF_ESQUECI_SENHA,
  RECUPERA_ANDAMENTO,
  ALTERA_SENHA_ERRO,
  ALTERA_SENHA_SUCESSO,
  MODIFICA_VISIBILIDADE
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_CPF_ESQUECI_SENHA:
      return {...state, cpf: action.payload};
    case RECUPERA_ANDAMENTO:
      return {...state, carregamento: false}
    case ALTERA_SENHA_ERRO:
      return {...state, carregamento: true, mostraMensagem: true, mensagemRecupera: action.payload, cpf: ''}
    case ALTERA_SENHA_SUCESSO:
      return {...state, carregamento: true, mostraMensagem: true, mensagemRecupera: action.payload, cpf: ''}
    case MODIFICA_VISIBILIDADE:
      return {...state, mostraMensagem: false}
    default:
      return state;
  }
}
