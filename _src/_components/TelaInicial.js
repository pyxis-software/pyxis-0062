import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';

import {modificaHelloWorld} from '../_actions/TelaInicialReducer';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class TelaInicial extends Component{
  render(){
    return(
      <View style={styles.containerPrincipal}>
        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerInformacoes}>
          <Text style={styles.textoBemVindo}> Bem-vindo! </Text>

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={() => false}
            value={this.props.cpf}
            placeholder="Digite seu CPF"
            style={styles.textInput}
          />

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={() => false}
            value={this.props.senha}
            secureTextEntry
            placeholder="Digite sua Senha"
            style={styles.textInput}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cpf: state.TelaInicialReducer.cpf,
  senha: state.TelaInicialReducer.senha
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1
  },
  containerLogo: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInformacoes: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: '#3258A4'
  },
  logo: {
    width: 180,
    height: 180
  },
  textoBemVindo: {
    color: '#fff',
    fontSize: 25
  },
  textInput: {
    margin: 25,
    backgroundColor: '#fff',
    color: 'gray'
  }
});

export default connect(mapStateToProps, {modificaHelloWorld})(TelaInicial);
