const INITIAL_STATE = {
  dados: [],
  indicadorFinanceiro: true,
  cpf: ''
};

import {
  MOSTRAR_FINANCEIRO_SUCESSO,
  AUTENTICACAO_SUCESSO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTENTICACAO_SUCESSO:
      return {...state, cpf: action.payload.result.cpf}
    case MOSTRAR_FINANCEIRO_SUCESSO:
      return {...state, dados: action.payload, indicadorFinanceiro: false}
    default:
      return state
  }
}
