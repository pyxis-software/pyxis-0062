import {
  MOSTRAR_FINANCEIRO_SUCESSO
} from '../_actions/Types';

export const buscaFinanceiro = ({cpf}) => {
  return dispatch => {
    fetch('https://jrnet.pyxissoftware.com.br/api/boletos?cpf=' + cpf)
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson.erro){
        mostrarFinanceiroSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {})
  }
}

const mostrarFinanceiroSucesso = (responseJson, dispatch) => {
  dispatch({
    type: MOSTRAR_FINANCEIRO_SUCESSO,
    payload: responseJson.faturas
  });
}
