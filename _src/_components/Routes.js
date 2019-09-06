import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TelaInicial from './TelaInicial';
import EsqueciSenha from './EsqueciSenha';
import Menu from './Menu';
import TelaUsuario from './TelaUsuario';

export default props => (
  <Router>
    <Stack key="root">









      <Scene
        key="inicial"
        component={TelaInicial}
        hideNavBar={true}
      />

      <Scene
        key="esqueciSenha"
        component={EsqueciSenha}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#fff'}}
        navBarButtonColor="#000"
        navTransparent
      />

      <Scene
        key="menu"
        component={Menu}
        hideNavBar={true}
      />

      <Scene
        key="telaUsuario"
        component={TelaUsuario}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Meus Dados"
        titleStyle={{color: '#fff'}}
      />


    </Stack>
  </Router>
);
