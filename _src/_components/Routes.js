import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TelaInicial from './TelaInicial';

export default props => (
  <Router navigationBarStyle={{backgroundColor: '#115E54'}} titleStyle={{color: '#fff'}}>
    <Stack key="root">
      <Scene key="inicial" component={TelaInicial} title="Tela Inicial" hideNavBar={false} />
    </Stack>
  </Router>
);
