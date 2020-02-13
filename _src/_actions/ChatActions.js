import firebase from 'firebase';

import {
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM_SUCESSO
} from './Types';

export const modificaMensagem = texto => {
  return({
    type: MODIFICA_MENSAGEM,
    payload: texto
  })
}

export const enviarMensagem = (mensagem, cpf, nome, email, horario) => {
  cpf = cpf.replace(/\./g, "");
  cpf = cpf.replace("-", "");

  return dispatch => {
    firebase.database().ref("/mensagens/" + cpf + "/juniorNet").push({mensagem, tipo: 'envio', horario, lido: false})
      .then(() => {
        firebase.database().ref("/mensagens/juniorNet/" + cpf).push({mensagem, tipo: 'recebimento', horario})
          .then(() => dispatch ({type: ENVIA_MENSAGEM_SUCESSO}))
      })
      .then(() => {
        firebase.database().ref("/usuario_conversas/" + cpf + "/juniorNet/").set({nome: "JuniorNet"})
          .then(() => {
            firebase.database().ref("/contatos/" + cpf).once("value").then(snapshot => {
              firebase.database().ref("/usuario_conversas/" + cpf + "/juniorNet").set({nome, email, cpf})
              .then(() =>{
                firebase.database().ref("/notificacoes").push({
                  mensagem: 'Nova mensagem de ' + nome,
                  para: 'JRNET',
                  tipo: 'Chat',
                  title: 'Chat'
                })
              })
            })
          })
      });
  }
}
