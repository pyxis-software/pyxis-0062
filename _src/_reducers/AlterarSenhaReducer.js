const INITIAL_STATE = {
  senhaAntiga: '',
  senhaNova: '',
  carregamento: false,
  sucesso: false,
  erro: ''
};

import {
  MODIFICA_SENHA_NOVA,
  MODIFICA_SENHA_ANTIGA,
  ALTERA_SENHA_USUARIO_ANDAMENTO,
  ALTERA_SENHA_USUARIO_ERRO,
  ALTERA_SENHA_USUARIO_SUCESSO,
  SUCESSO_PROCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_SENHA_ANTIGA:
      return {...state, senhaAntiga: action.payload}
    case MODIFICA_SENHA_NOVA:
      return {...state, senhaNova: action.payload}
    case ALTERA_SENHA_USUARIO_ANDAMENTO:
      return {...state, carregamento: true}
    case ALTERA_SENHA_USUARIO_SUCESSO:
      return {...state, carregamento: false, senhaAntiga: '', senhaNova: '', sucesso: true}
    case ALTERA_SENHA_USUARIO_ERRO:
      return {...state, carregamento: false, erro: action.payload}
    case SUCESSO_PROCESSO:
      return {...state, sucesso: false, erro: ''}
    default:
      return state;
  }
}
