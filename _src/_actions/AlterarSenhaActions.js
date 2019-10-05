import {
  MODIFICA_SENHA_NOVA,
  MODIFICA_SENHA_ANTIGA,
  ALTERA_SENHA_USUARIO_ANDAMENTO,
  ALTERA_SENHA_USUARIO_ERRO,
  ALTERA_SENHA_USUARIO_SUCESSO,
  SUCESSO_PROCESSO
} from '../_actions/Types';

export const modificaSenhaAntiga = (senhaAntiga) => {
  return {
    type: MODIFICA_SENHA_ANTIGA,
    payload: senhaAntiga
  }
}

export const modificaSenhaNova = (senhaNova) => {
  return {
    type: MODIFICA_SENHA_NOVA,
    payload: senhaNova
  }
}

export const btnAlterarSenha = ({cpf, senhaAntiga, senhaNova}) => {
  return dispatch => {

    dispatch({type: ALTERA_SENHA_USUARIO_ANDAMENTO});

    fetch('https://jrnet.padraotorrent.com/api/alterasenha?cpf=' + cpf + '&senhaNova=' + senhaNova + '&senhaAntiga=' + senhaAntiga)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        alteraErro(responseJson.msg, dispatch);
      }else{
        alteraSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {
      alteraErro("Verifique sua conexão ou tente novamente mais tarde.", dispatch);
    })
  }
}

const alteraErro = (mensagem, dispatch) => {
  dispatch({
    type: ALTERA_SENHA_USUARIO_ERRO,
    payload: mensagem
  });
}

const alteraSucesso = (responseJson, dispatch) => {
  dispatch({
    type: ALTERA_SENHA_USUARIO_SUCESSO
  });
}

export const sucessoProcesso = () => {
  return {
    type: SUCESSO_PROCESSO
  }
}
