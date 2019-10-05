const INITIAL_STATE = {
  nome: '',
  cpf: '',
  senha: '',
  email: '',
  celularPrincipal: '',
  celularSecundario: '',
  endereco: '',
  cidadeEstado: '',
  diaPagamento: '',
  carregamentoCadastrar: false,
  erro: '',
  sucesso: false
};

import {
  MODIFICA_NOME_CADASTRO,
  MODIFICA_CPF_CADASTRO,
  MODIFICA_SENHA_CADASTRO,
  MODIFICA_EMAIL_CADASTRO,
  MODIFICA_CELULAR_PRINCIPAL_CADASTRO,
  MODIFICA_CELULAR_SECUNDARIO_CADASTRO,
  MODIFICA_ENDERECO_CADASTRO,
  MODIFICA_CIDADE_ESTADO_CADASTRO,
  MODIFICA_DIA_PAGAMENTO_CADASTRO,
  CADASTRO_ANDAMENTO,
  CADASTRO_ERRO,
  CADASTRO_SUCESSO,
  SUCESSO_CADASTRO
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_NOME_CADASTRO:
      return {...state, nome: action.payload};
    case MODIFICA_CPF_CADASTRO:
      return {...state, cpf: action.payload};
    case MODIFICA_SENHA_CADASTRO:
      return {...state, senha: action.payload};
    case MODIFICA_EMAIL_CADASTRO:
      return {...state, email: action.payload};
    case MODIFICA_CELULAR_PRINCIPAL_CADASTRO:
      return {...state, celularPrincipal: action.payload};
    case MODIFICA_CELULAR_SECUNDARIO_CADASTRO:
      return {...state, celularSecundario: action.payload};
    case MODIFICA_ENDERECO_CADASTRO:
      return {...state, endereco: action.payload};
    case MODIFICA_CIDADE_ESTADO_CADASTRO:
      return {...state, cidadeEstado: action.payload};
    case MODIFICA_DIA_PAGAMENTO_CADASTRO:
      return {...state, diaPagamento: action.payload};
    case CADASTRO_ANDAMENTO:
      return {...state, carregamentoCadastrar: true}
    case CADASTRO_ERRO:
      return {...state, carregamentoCadastrar: false, erro: action.payload}
    case CADASTRO_SUCESSO:
      return {...state, carregamentoCadastrar: false, sucesso: true}
    case SUCESSO_CADASTRO:
      return {...state,
        sucesso: false,
        nome: '',
        cpf: '',
        senha: '',
        email: '',
        celularPrincipal: '',
        celularSecundario: '',
        endereco: '',
        cidadeEstado: '',
        diaPagamento: ''
      }
    default:
      return state;
  }
}
