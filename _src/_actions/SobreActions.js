import {
  MOSTRAR_INFORMACOES_EMPRESA
} from '../_actions/Types';

export const mostrarInformacoesEmpresa = () => {
  return dispatch => {
    fetch('https://jrnet.pyxissoftware.com.br/api/info')
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson.erro){
        mostrarInformacoesSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {})
  }
}

const mostrarInformacoesSucesso = (responseJson, dispatch) => {
  dispatch({
    type: MOSTRAR_INFORMACOES_EMPRESA,
    payload: responseJson
  });
}
