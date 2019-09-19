import React, {Component} from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';

import Routes from './_src/_components/Routes';
import Reducers from './_src/_reducers';

class App extends Component{

  componentWillMount(){
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

  render(){
    console.disableYellowBox = true;
    return(
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <StatusBar hidden={false} backgroundColor='#104E8B'/>
        <Routes />
      </Provider>
    );
  }
}

export default App;
