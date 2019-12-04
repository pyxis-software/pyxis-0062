import {
  MOSTRAR_NOTICIAS_SUCESSO
} from '../_actions/Types';

export const mostrarNoticias = () => {
  return dispatch => {
    fetch('https://jrnet.pyxissoftware.com.br/api/murais')
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson.erro){
        mostrarNoticiasSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {})
  }
}

const mostrarNoticiasSucesso = (responseJson, dispatch) => {
  dispatch({
    type: MOSTRAR_NOTICIAS_SUCESSO,
    payload: responseJson.murais
  });
}
