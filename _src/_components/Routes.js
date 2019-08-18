import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TelaInicial from './TelaInicial';

export default props => (
  <Router>
    <Stack key="root">
      <Scene key="inicial" component={TelaInicial} title="Tela Inicial" hideNavBar={true} />
    </Stack>
  </Router>
);
