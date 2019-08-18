import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {modificaCPF, modificaSenha} from '../_actions/TelaInicialActions';

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

          <View style={styles.containerInputBotao}>
            <TextInput
              onChangeText={(cpf) => this.props.modificaCPF(cpf)}
              value={this.props.cpf}
              placeholder="Digite seu CPF"
              style={styles.textInput}
            />

            <TextInput
              onChangeText={(senha) => this.props.modificaSenha(senha)}
              value={this.props.senha}
              secureTextEntry
              placeholder="Digite sua Senha"
              style={styles.textInput}
            />

            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={() => {return false}}
              underlayColor='#fff'
            >
              <Text style={styles.textoEntrar}>Entrar</Text>
             </TouchableOpacity>

            <Text style={styles.textoEsqueciSenha} onPress={() => {return false}}>
              Esqueci Minha Senha
            </Text>

          </View>
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
    backgroundColor: '#3258A4',
    paddingTop: 40
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
    marginBottom: 20,
    backgroundColor: '#fff',
    color: 'gray',
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  },
  containerInputBotao: {
    paddingTop: 50
  },
  botaoEntrar: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textoEsqueciSenha: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    padding: 65
  },
  textoEntrar: {
    color:'#3258A4',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});

export default connect(mapStateToProps, {modificaCPF, modificaSenha})(TelaInicial);
