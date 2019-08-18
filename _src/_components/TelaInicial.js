import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import {modificaHelloWorld} from '../_actions/PrincipalActions';

class TelaInicial extends Component{
  render(){
    return(
      <View>
        <Button
          onPress={() => this.props.modificaHelloWorld()}
          title="Mudar Texto"
          color="#841584"
        />
        <Text> {this.props.helloWorld} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  helloWorld: state.PrincipalReducer.helloWorld
});

export default connect(mapStateToProps, {modificaHelloWorld})(TelaInicial);
