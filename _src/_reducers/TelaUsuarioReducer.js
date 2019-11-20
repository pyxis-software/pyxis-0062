const INITIAL_STATE = {
  cpf: '',
  nome: '',
  endereco: '',
  cidade: '',
  telefone1: '',
  telefone2: ''
};

import {
  AUTENTICACAO_SUCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTENTICACAO_SUCESSO:
      return {...state,
        cpf: action.payload.result.cpf,
        nome: action.payload.result.nome,
        endereco: action.payload.result.endereco,
        cidade: action.payload.result.cidade,
        telefone1: action.payload.result.telefones[0],
        telefone2: action.payload.result.telefones[1]
      }
    default:
      return state;
  }
}
