import {
  MODIFICA_CPF_ESQUECI_SENHA,
  RECUPERA_ANDAMENTO,
  ALTERA_SENHA_ERRO,
  ALTERA_SENHA_SUCESSO,
  MODIFICA_VISIBILIDADE
} from '../_actions/Types';

export const modificaCPFEsqueciSenha = (cpfEsqueciSenha) => {
  return {
    type: MODIFICA_CPF_ESQUECI_SENHA,
    payload: cpfEsqueciSenha
  }
}

export const esqueciMinhaSenha = ({cpf}) => {
  return dispatch => {
    dispatch({type: RECUPERA_ANDAMENTO});

    fetch('https://jrnet.pyxissoftware.com.br/api/recupera?cpf=' + cpf)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        alteraSenhaErro("CPF inválido ou não cadastrado.", dispatch);
      }else{
        alteraSenhaSucesso("Enviamos uma nova senha para o seu e-mail. Verifique-o!", dispatch);
      }
    })
    .catch((error) => {
      alteraSenhaErro("Verifique sua conexão ou tente novamente mais tarde.", dispatch);
    })
  }
}

const alteraSenhaErro = (mensagem, dispatch) => {
  dispatch({
    type: ALTERA_SENHA_ERRO,
    payload: mensagem
  });
}

const alteraSenhaSucesso = (mensagem, dispatch) => {
  dispatch({
    type: ALTERA_SENHA_SUCESSO,
    payload: mensagem
  });
}

export const modificaVisibilidade = () => ({
  type: MODIFICA_VISIBILIDADE
});
