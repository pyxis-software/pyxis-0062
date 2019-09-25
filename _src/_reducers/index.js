import {combineReducers} from 'redux';
import TelaInicialReducer from './TelaInicialReducer';
import EsqueciSenhaReducer from './EsqueciSenhaReducer';
import TelaUsuarioReducer from './TelaUsuarioReducer';
import ChatReducer from './ChatReducer';
import PlanosReducer from './PlanosReducer';

export default combineReducers({
  TelaInicialReducer,
  EsqueciSenhaReducer,
  TelaUsuarioReducer,
  ChatReducer,
  PlanosReducer
});
