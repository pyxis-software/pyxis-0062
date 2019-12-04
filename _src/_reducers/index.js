import {combineReducers} from 'redux';

import TelaInicialReducer from './TelaInicialReducer';
import EsqueciSenhaReducer from './EsqueciSenhaReducer';
import TelaUsuarioReducer from './TelaUsuarioReducer';
import ChatReducer from './ChatReducer';
import PlanosReducer from './PlanosReducer';
import NoticiasReducer from './NoticiasReducer';
import CadastroReducer from './CadastroReducer';
import AlterarSenhaReducer from './AlterarSenhaReducer';
import FinanceiroReducer from './FinanceiroReducer';
import MenuReducer from './MenuReducer';
import SobreReducer from './SobreReducer';

export default combineReducers({
  TelaInicialReducer,
  EsqueciSenhaReducer,
  TelaUsuarioReducer,
  ChatReducer,
  PlanosReducer,
  NoticiasReducer,
  CadastroReducer,
  AlterarSenhaReducer,
  FinanceiroReducer,
  MenuReducer,
  SobreReducer
});
