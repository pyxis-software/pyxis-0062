import {
  MODIFICA_CPF,
  MODIFICA_SENHA
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
