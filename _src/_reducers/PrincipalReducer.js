const INITIAL_STATE = {
  helloWorld: 'Hello, world!'
};

import {
  HELLO_WORLD
} from '../_actions/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HELLO_WORLD:
      return {...state, helloWorld: action.payload};
    default:
      return state;
  }
}
