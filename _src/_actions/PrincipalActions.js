import {
  HELLO_WORLD
} from '../_actions/Types';

export const modificaHelloWorld = () => {
  return {
    type: HELLO_WORLD,
    payload: "Olá, Mundo!"
  }
}
