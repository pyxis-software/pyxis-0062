import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TelaInicial from './TelaInicial';
import EsqueciSenha from './EsqueciSenha';

export default props => (
  <Router>
    <Stack key="root">
      <Scene key="inicial" component={TelaInicial} hideNavBar={true} />
      <Scene key="esqueciSenha" component={EsqueciSenha} hideNavBar={false} title="Voltar" />
    </Stack>
  </Router>
);
