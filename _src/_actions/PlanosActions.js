import {
  MOSTRAR_PLANOS_SUCESSO
} from '../_actions/Types';

export const mostrarPlanos = ({cpf}) => {
  return dispatch => {
    fetch('https://jrnet.pyxissoftware.com.br/api/planos?cpf=' + cpf)
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson.erro){
        mostrarPlanosSucesso(responseJson, dispatch);
      }
    })
    .catch((error) => {})
  }
}

const mostrarPlanosSucesso = (responseJson, dispatch) => {
  dispatch({
    type: MOSTRAR_PLANOS_SUCESSO,
    payload: responseJson
  });
}
