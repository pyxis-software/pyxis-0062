import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Routes from './_src/_components/Routes';
import Reducers from './_src/_reducers';

class App extends Component{
  render(){
    console.disableYellowBox = true;
    return(
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
