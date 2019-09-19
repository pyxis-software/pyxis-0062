import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import Menu from './Menu';
import TelaInicial from './TelaInicial';
import EsqueciSenha from './EsqueciSenha';
import TelaUsuario from './TelaUsuario';
import Noticias from './Noticias';
import Sobre from './Sobre';
import Planos from './Planos';
import Chat from './Chat';
import Financeiro from './Financeiro';
import Pagamento from './Pagamento';

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

      <Scene
        key="noticias"
        component={Noticias}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Notícias"
        titleStyle={{color: '#fff'}}
      />

      <Scene
        key="sobre"
        component={Sobre}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Sobre a Empresa"
        titleStyle={{color: '#fff'}}
      />

      <Scene
        key="planos"
        component={Planos}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Planos"
        titleStyle={{color: '#fff'}}
      />

      <Scene
        key="chat"
        component={Chat}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Suporte JúniorNET"
        titleStyle={{color: '#fff'}}
      />

      <Scene
        key="pagamento"
        component={Pagamento}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Aguardando Pagamento"
        titleStyle={{color: '#fff'}}
      />

      <Scene
        key="financeiro"
        component={Financeiro}
        hideNavBar={false}
        navigationBarStyle={{backgroundColor: '#3258A4'}}
        navBarButtonColor="#fff"
        title="Financeiro"
        titleStyle={{color: '#fff'}}
      />

    </Stack>
  </Router>
);
