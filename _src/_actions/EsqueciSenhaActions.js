import {
  MODIFICA_CPF_ESQUECI_SENHA
} from '../_actions/Types';

export const modificaCPFEsqueciSenha = (cpfEsqueciSenha) => {
  return {
    type: MODIFICA_CPF_ESQUECI_SENHA,
    payload: cpfEsqueciSenha
  }
}
