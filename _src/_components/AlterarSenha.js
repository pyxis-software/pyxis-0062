import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image, Alert} from 'react-native';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

import {modificaSenhaAntiga, modificaSenhaNova, btnAlterarSenha, sucessoProcesso} from '../_actions/AlterarSenhaActions';

class AlterarSenha extends Component{
  _alterarSenha(){
    const {cpf, senhaAntiga, senhaNova} = this.props;
    if(senhaAntiga != '' && senhaNova != ''){
      this.props.btnAlterarSenha({cpf, senhaAntiga, senhaNova});
    }else{
      Alert.alert(
        'Preencha Todos os Campos',
        'Um ou mais campos estão em branco!',
        [{text: 'Fechar'}],
        {cancelable: false},
      );
    }
  }

  renderErro(){
    return(
      <View style={styles.containerErro}>
        <Text style={styles.erro}> {this.props.erro} </Text>
      </View>
    );
  }

  renderMensagemSucesso(){
    if(this.props.sucesso){
      Alert.alert(
        'Senha Alterada com Sucesso',
        'Entre com a nova senha para ter acesso ao sistema.',
        [{text: 'Fechar', onPress: () => {
          AsyncStorage.setItem('usuarioLogado', '');
          AsyncStorage.setItem('cpfLogado', '');
          AsyncStorage.setItem('senhaLogado', '');
          RNRestart.Restart();
        }}],
        {cancelable: false},
      );
    }
  }

  renderBotaoAlterar(){
    if (this.props.carregamento) {
      return(
        <View>
          <View style={{alignItems: 'center', paddingBottom: 20, paddingTop: 20}}>
            <Text style={{color: '#3258A4'}}> Validando informações... </Text>
          </View>
          <ActivityIndicator size="large" color="#3258A4" />
        </View>
      );
    }else{
      return(
        <TouchableOpacity
          style={styles.botaoAlterar}
          onPress={() => {this._alterarSenha()}}
          underlayColor='#fff'>
          <Text style={styles.textoAlterar}> Alterar Senha </Text>
        </TouchableOpacity>
      );
    }
  }

  render(){
    return(
      <ScrollView style={styles.containerPrincipal}>
        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerInputs}>
          <Text style={styles.textoInformativoRecuperacao}>
            * Em caso de recuperação de senha, no campo de senha antiga, informe a mesma recebida por e-mail!
          </Text>

          <TextInput
            onChangeText={(senha) => this.props.modificaSenhaAntiga(senha)}
            value={this.props.senhaAntiga}
            secureTextEntry
            placeholder="Senha antiga"
            style={styles.textInput}
          />

          <TextInput
            onChangeText={(senha) => this.props.modificaSenhaNova(senha)}
            value={this.props.senhaNova}
            secureTextEntry
            placeholder="Senha nova"
            style={styles.textInput}
          />

          <View>
            {this.renderErro()}
          </View>

          <View style={{paddingBottom: 30}}>
            {this.renderBotaoAlterar()}
          </View>

          <View>
            {this.renderMensagemSucesso()}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  senhaAntiga: state.AlterarSenhaReducer.senhaAntiga,
  senhaNova: state.AlterarSenhaReducer.senhaNova,
  erro: state.AlterarSenhaReducer.erro,
  carregamento: state.AlterarSenhaReducer.carregamento,
  sucesso: state.AlterarSenhaReducer.sucesso
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1
  },
  containerLogo: {
    paddingTop: 15,
    marginTop: 10,
    paddingBottom: 15,
    alignItems: 'center'
  },
  textoInformativo: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 15,
    color: '#3258A4'
  },
  logo: {
    width: 144,
    height: 144
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
  containerInputs: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoInformativoRecuperacao: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    color: '#3258A4',
    textAlign: 'center'
  },
  botaoAlterar: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#3258A4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3258A4'
  },
  textoAlterar: {
    color:'#fff',
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
  containerErro: {
    paddingTop: 10
  }
});

export default connect(mapStateToProps, {modificaSenhaAntiga, modificaSenhaNova, btnAlterarSenha, sucessoProcesso})(AlterarSenha);
