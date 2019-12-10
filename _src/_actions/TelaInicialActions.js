import {Actions} from 'react-native-router-flux';

import {
  MODIFICA_CPF,
  MODIFICA_SENHA,
  AUTENTICACAO_ERRO,
  AUTENTICACAO_SUCESSO,
  LOGIN_ANDAMENTO
} from '../_actions/Types';

export const modificaCPF = (cpf) => {
  return {
    type: MODIFICA_CPF,
    payload: cpf
  }
}

export const modificaSenha = (senha) => {
  return {
    type:   MODIFICA_SENHA,
    payload: senha
  }
}

export const fazerLogin = ({cpf, senha}) => {
  return dispatch => {
    dispatch({type: LOGIN_ANDAMENTO});

    fetch('https://jrnet.pyxissoftware.com.br/api/loginuser?cpf=' + cpf + '&senha=' + senha)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        autenticacaoErro(responseJson.msg, dispatch);
      }else{
        responseJson["senha"] = senha;
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
