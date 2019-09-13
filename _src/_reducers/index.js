import {combineReducers} from 'redux';
import TelaInicialReducer from './TelaInicialReducer';
import EsqueciSenhaReducer from './EsqueciSenhaReducer';
import TelaUsuarioReducer from './TelaUsuarioReducer';

export default combineReducers({
  TelaInicialReducer,
  EsqueciSenhaReducer,
  TelaUsuarioReducer
});
