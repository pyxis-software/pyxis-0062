import {Actions} from 'react-native-router-flux';

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
  CADASTRO_ANDAMENTO
} from '../_actions/Types';

export const modificaNome = (informacao) => {
  return {
    type: MODIFICA_NOME_CADASTRO,
    payload: informacao
  }
}

export const modificaCPF = (informacao) => {
  return {
    type: MODIFICA_CPF_CADASTRO,
    payload: informacao
  }
}

export const modificaSenha = (informacao) => {
  return {
    type: MODIFICA_SENHA_CADASTRO,
    payload: informacao
  }
}

export const modificaEmail = (informacao) => {
  return {
    type: MODIFICA_EMAIL_CADASTRO,
    payload: informacao
  }
}

export const modificaCelularPrincipal = (informacao) => {
  return {
    type: MODIFICA_CELULAR_PRINCIPAL_CADASTRO,
    payload: informacao
  }
}

export const modificaCelularSecundario = (informacao) => {
  return {
    type: MODIFICA_CELULAR_SECUNDARIO_CADASTRO,
    payload: informacao
  }
}

export const modificaEndereco = (informacao) => {
  return {
    type: MODIFICA_ENDERECO_CADASTRO,
    payload: informacao
  }
}

export const modificaCidadeEstado = (informacao) => {
  return {
    type: MODIFICA_CIDADE_ESTADO_CADASTRO,
    payload: informacao
  }
}

export const modificaDiaPagamento = (informacao) => {
  return {
    type: MODIFICA_DIA_PAGAMENTO_CADASTRO,
    payload: informacao
  }
}









export const fazerCadastro = ({nome, cpf, senha, email, celularPrincipal, celularSecundario, endereco, cidadeEstado, diaPagamento}) => {
  return dispatch => {

    dispatch({type: CADASTRO_ANDAMENTO});

    fetch('https://jrnet.padraotorrent.com/api/loginuser?cpf=' + cpf + '&senha=' + senha)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        autenticacaoErro(responseJson.msg, dispatch);
      }else{
        autenticacaoSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {
      autenticacaoErro("Verifique sua conexão ou tente novamente mais tarde.", dispatch);
    })
  }
}

const autenticacaoErro = (mensagem, dispatch) => {
  dispatch({
    type: AUTENTICACAO_ERRO,
    payload: mensagem
  });
}

const autenticacaoSucesso = (responseJson, dispatch) => {
  dispatch({
    type: AUTENTICACAO_SUCESSO,
    payload: responseJson
  });
  Actions.menu();
}
