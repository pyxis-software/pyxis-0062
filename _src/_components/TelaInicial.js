import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {TextInputMask} from 'react-native-masked-text';
import AsyncStorage from '@react-native-community/async-storage';

import {modificaCPF, modificaSenha, fazerLogin} from '../_actions/TelaInicialActions';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class TelaInicial extends Component{

  constructor(props){
    super(props);
    this.state = {
      carregamentoTela: true
    }
  }

  _fazerLoginInformacoesArmazenadas(cpfLogado, senhaLogado){
    this.props.fazerLogin({cpf: cpfLogado, senha: senhaLogado});
  }

  async componentWillMount(){
    await AsyncStorage.getItem('usuarioLogado').then(usuarioLogado => {
        if(usuarioLogado){
          AsyncStorage.getItem('cpfLogado').then(cpfLogado => {
            if(cpfLogado){
              AsyncStorage.getItem('senhaLogado').then(senhaLogado => {
                if(senhaLogado){
                  this._fazerLoginInformacoesArmazenadas(cpfLogado, senhaLogado);
                }else{
                  this.setState({carregamentoTela: false});
                }
              });
            }else{
              this.setState({carregamentoTela: false});
            }
          });
        }else{
          this.setState({carregamentoTela: false});
        }
    });
  }

  async armazenaUsuarioLogado(cpf, senha){
    await AsyncStorage.setItem('usuarioLogado', 'logado');
    await AsyncStorage.setItem('cpfLogado', cpf);
    await AsyncStorage.setItem('senhaLogado', senha);
  }

  _fazerLogin(){
    const {cpf, senha} = this.props;
    if(cpf, senha){
      this.armazenaUsuarioLogado(cpf, senha);
      this.props.fazerLogin({cpf, senha});
    }else{
      Alert.alert(
        'Dados insuficientes',
        'Digite suas informações para ter acesso ao sistema!',
        [{text: 'Fechar'}],
        {cancelable: false},
      );
    }
  }

  renderBotaoAcessar(){
    if (this.props.carregamentoInicial) {
      return(
        <View>
          <ActivityIndicator size="large" color="#fff" />

          <View style={styles.containerValidacao}>
            <Text style={{color: '#fff'}}> Validando informações... </Text>
          </View>
        </View>
      );
    }else{
      return(
        <View>
          <View>
            {this.renderErro()}
          </View>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => this._fazerLogin()}
            underlayColor='#fff'>
              <Text style={styles.textoEntrar}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.textoBotoesAdicionais} onPress={() => {Actions.esqueciSenha()}}>
            Esqueci minha senha
          </Text>

          <Text style={styles.textoBotoesAdicionais} onPress={() => {Actions.cadastro()}}>
            Cadastre-se agora
          </Text>
        </View>
      );
    }
  }

  renderErro(){
    if(this.props.erro){
      return(
        <View style={{paddingBottom: 10}}>
          <Text style={styles.erro}> {this.props.mensagem} </Text>
        </View>
      );
    }
  }

  render(){
    if(this.state.carregamentoTela){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#3258A4" />

          <View style={styles.containerValidacao}>
            <Text style={{color: '#3258A4'}}> Buscando informações. Aguarde... </Text>
          </View>
        </View>
      );
    }else{
      return(
        <View style={styles.containerPrincipal}>
          <View style={styles.containerLogo}>
            <Image source={LogoJuniorNet} style={styles.logo} />
          </View>

          <View style={styles.containerInformacoes}>
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.textoBemVindo}> Seja bem-vindo(a)! </Text>
              </View>

              <View style={{paddingTop: 35}}>
                <TextInputMask
                  type={'cpf'}
                  value={this.props.cpf}
                  onChangeText={(cpf) => this.props.modificaCPF(cpf)}
                  placeholder="Digite seu CPF"
                  style={styles.textInput}
                  keyboardType={'numeric'}
                  maxLength={14}
                />

                <TextInput
                  onChangeText={(senha) => this.props.modificaSenha(senha)}
                  value={this.props.senha}
                  secureTextEntry
                  placeholder="Digite sua senha"
                  style={styles.textInput}
                />

                <View>
                  {this.renderBotaoAcessar()}
                </View>

              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  cpf: state.TelaInicialReducer.cpf,
  senha: state.TelaInicialReducer.senha,
  carregamentoInicial: state.TelaInicialReducer.carregamentoInicial,
  erro: state.TelaInicialReducer.erro,
  mensagem: state.TelaInicialReducer.mensagem,
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLogo: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  containerInformacoes: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: '#3258A4',
    paddingTop: 30
  },
  logo: {
    width: 180,
    height: 180
  },
  textoBemVindo: {
    color: '#fff',
    fontSize: 22
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
  textoBotoesAdicionais: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 35
  },
  textoEntrar: {
    color:'#3258A4',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  erro: {
    color: '#ff0000',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  containerValidacao: {
    alignItems: 'center',
    paddingTop: 15
  }
});

export default connect(mapStateToProps, {modificaCPF, modificaSenha, fazerLogin})(TelaInicial);
