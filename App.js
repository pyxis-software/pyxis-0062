import React, {Component} from 'react';
import {StatusBar, AppState, AppRegistry} from 'react-native';

import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';

import Routes from './_src/_components/Routes';
import Reducers from './_src/_reducers';

import PushController from './_src/_components/PushController';
import PushNotification from 'react-native-push-notification';

const push = async (data) =>{
  setInterval(()=>{
    fetch('https://jrnet.padraotorrent.com/api/notificacoes?cpf=108.103.094-16')
    .then((response) => response.json())
    .then((responseJson) => {

        if(!responseJson.erro){
          responseJson.notifications.map((noti)=>{
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                message: noti.msg, // (required)
                largeIcon: "@drawable/logo", // (optional) default: "ic_launcher"
                smallIcon: "@drawable/logo",
                actions: '["Abrir"]',
                date: new Date(Date.now()) // in 60 secs
            });
          });
        }
    })
    .catch((error) => {
      console.error(error);
    });
  }, 60000);
}


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      msgErro: '',
      seconds: 5,
    }
    this.handleAppStateChange = this.handleAppStateChange.bind(this); 
  }

  componentWillMount(){
    AppState.addEventListener('change', this.handleAppStateChange);
    let firebaseConfig = {
      apiKey: "AIzaSyBk7fGB0fgKp_ptTx_9hO8CA7kpai2nZMk",
      authDomain: "juniornet-de37f.firebaseapp.com",
      databaseURL: "https://juniornet-de37f.firebaseio.com",
      projectId: "juniornet-de37f",
      storageBucket: "",
      messagingSenderId: "253846926898",
      appId: "1:253846926898:web:b0d0b61981341904c52e2b"
    };
    firebase.initializeApp(firebaseConfig);
  }

  componentDidMount(){
    AppRegistry.registerHeadlessTask('SomeTaskName', ()=> push);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState){
    if(appState === 'background'){
      console.log('Rodando em Background');
    }

    if(appState === 'active'){
      console.log('Ativo');
    }
  }

  render(){
    console.disableYellowBox = true;
    return(
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <PushController />
        <StatusBar hidden={false} backgroundColor='#104E8B'/>
        <Routes />
      </Provider>
    );
  }
}

export default App;