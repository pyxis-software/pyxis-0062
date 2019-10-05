import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {connect} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import {Actions} from 'react-native-router-flux';

import {modificaCPFEsqueciSenha, esqueciMinhaSenha, modificaVisibilidade} from '../_actions/EsqueciSenhaActions';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class EsqueciSenha extends Component{

  _esqueciMinhaSenha(){
    const {cpf} = this.props;
    if(cpf){
      this.props.esqueciMinhaSenha({cpf});
    }else{
      Alert.alert(
        'Precisamos do seu CPF',
        'Digite seu CPF no campo de texto para solicitar uma nova senha!',
        [{text: 'Fechar'}],
        {cancelable: false},
      );
    }
  }

  renderBotao(){
    if(this.props.carregamento){
      return(
        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => {this._esqueciMinhaSenha()}}
          underlayColor='#fff'
        >
          <Text style={styles.textoEntrar}> Solicitar </Text>
         </TouchableOpacity>
      );
    }else{
      return(
        <ActivityIndicator size="large" color="#fff" />
      );
    }
  }

  renderMensagem(){
    if(this.props.mostraMensagem){
      const {mensagemRecupera} = this.props;
      Alert.alert(
        'Redefinir Senha',
        mensagemRecupera,
        [{text: 'Fechar', onPress: () => {
          this.props.modificaVisibilidade();
          Actions.pop();
        }}],
        {cancelable: false},
      );
    }
  }

  render(){
    return(
      <View style={styles.containerPrincipal}>

        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerInformacoes}>
          <Text style={styles.textoBemVindo}> Solicitar nova senha </Text>

          <View style={styles.containerInputBotao}>
            <TextInputMask
              type={'cpf'}
              value={this.props.cpf}
              onChangeText={(cpf) => this.props.modificaCPFEsqueciSenha(cpf)}
              placeholder="Digite seu CPF"
              style={styles.textInput}
              keyboardType={'numeric'}
              maxLength={14}
            />

            <View style={styles.containerBotoes}>
              {this.renderBotao()}
            </View>

            <View>
              {this.renderMensagem()}
            </View>

            <View style={styles.containerBotoes}>
              <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => {Actions.pop()}}
                underlayColor='#fff'
              >
                <Text style={styles.textoVoltar}> Voltar </Text>
               </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cpf: state.EsqueciSenhaReducer.cpf,
  mensagemRecupera: state.EsqueciSenhaReducer.mensagemRecupera,
  carregamento: state.EsqueciSenhaReducer.carregamento,
  mostraMensagem: state.EsqueciSenhaReducer.mostraMensagem
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
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
    borderWidth: 1,
    borderRadius: 10
  },
  containerInputBotao: {
    paddingTop: 50
  },
  botaoEntrar: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textoEntrar: {
    color:'#3258A4',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  botaoVoltar: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textoVoltar: {
    color:'#3258A4',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  containerBotoes: {
    paddingTop: 25
  }
});

export default connect(mapStateToProps, {modificaCPFEsqueciSenha, esqueciMinhaSenha, modificaVisibilidade})(EsqueciSenha);
