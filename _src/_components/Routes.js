import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TelaInicial from './TelaInicial';
import EsqueciSenha from './EsqueciSenha';
import Menu from './Menu';

export default props => (
  <Router>
    <Stack key="root">

      <Scene key="menu" component={Menu} hideNavBar={true} />

      <Scene key="inicial" component={TelaInicial} hideNavBar={true} />
      <Scene key="esqueciSenha" component={EsqueciSenha} hideNavBar={true} />
    </Stack>
  </Router>
);
