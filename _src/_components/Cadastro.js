import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image, Alert} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {TextInputMask} from 'react-native-masked-text';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

import {
  modificaNome,
  modificaCPF,
  modificaSenha,
  modificaEmail,
  modificaCelularPrincipal,
  modificaCelularSecundario,
  modificaEndereco,
  modificaCidadeEstado,
  modificaDiaPagamento,
  fazerCadastro,
  sucessoCadastro
} from '../_actions/CadastroActions';

class Cadastro extends Component{

  constructor(props){
    super(props);
    this.state = {
      senhaVerificar: ''
    }
  }

  _fazerCadastro(){
    const {nome, cpf, senha, email, celularPrincipal, celularSecundario, endereco, cidadeEstado, diaPagamento} = this.props;
    if (nome != '', cpf != '', senha != '', email != '', celularPrincipal != '', celularSecundario != '', endereco != '', cidadeEstado != '', diaPagamento != ''){
      if(this.state.senhaVerificar === senha){
        this.props.fazerCadastro({nome, cpf, senha, email, celularPrincipal, celularSecundario, endereco, cidadeEstado, diaPagamento});
      }else{
        Alert.alert(
          'Verifique suas senhas!',
          'As senhas que você digitou não batem!',
          [{text: 'Fechar'}],
          {cancelable: false},
        );
      }
    }else{
      Alert.alert(
        'Preencha todos os dados!',
        'Todos os campos estão em branco!',
        [{text: 'Fechar'}],
        {cancelable: false},
      );
    }
  }

  renderBotaoCadastrar(){
    if (this.props.carregamentoCadastrar) {
      return(
        <ActivityIndicator size="large" color="#fff" />
      );
    }else{
      return(
        <View>
          <TouchableOpacity
            style={styles.botaoFuncoes}
            onPress={() => {this._fazerCadastro()}}
            underlayColor='#fff'>
              <Text style={styles.textoFuncoes}> Cadastrar-se </Text>
          </TouchableOpacity>

          <View style={{paddingTop: 25}}>
            <TouchableOpacity
              style={styles.botaoFuncoes}
              onPress={() => {Actions.pop()}}
              underlayColor='#fff'>
                <Text style={styles.textoFuncoes}> Voltar </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderErro(){
    if(this.props.erro != ''){
      return(
        <View style={styles.containerErro}>
          <Text style={styles.erro}> {this.props.erro} </Text>
        </View>
      );
    }
  }

  mensagemSucesso(){
    if(this.props.sucesso){
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Seja bem-vindo(a) à nossa família!',
        [{text: 'Fechar', onPress: () => {
          this.props.sucessoCadastro();
          this.setState({senhaVerificar: ''});
          Actions.pop();
        }}],
        {cancelable: false},
      );
    }
  }

  render(){
    return(
      <View style={styles.containerPrincipal}>
        <View>
          <ScrollView>

            <View style={styles.containerLogo}>
              <Image source={LogoJuniorNet} style={styles.logo} />
            </View>

            <View style={styles.containerInputBotao}>

              <View style={styles.distanciaTextoInformativo}>
                <Text style={styles.textoInformativo}> Preencha todos os dados! </Text>
              </View>

              <Text style={styles.textoInformativoInputs}> Nome completo </Text>
              <TextInput
                onChangeText={(nome) => {this.props.modificaNome(nome)}}
                value={this.props.nome}
                placeholder="Digite seu nome completo"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> CPF (Somente números) </Text>
              <TextInputMask
                type={'cpf'}
                value={this.props.cpf}
                onChangeText={(cpf) => {this.props.modificaCPF(cpf)}}
                placeholder="Digite seu CPF"
                style={styles.textInput}
                keyboardType={'numeric'}
                maxLength={14}
              />

              <Text style={styles.textoInformativoInputs}> Digite uma senha </Text>
              <TextInput
                onChangeText={(senha) => {this.props.modificaSenha(senha)}}
                value={this.props.senha}
                secureTextEntry
                placeholder="Digite uma senha"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Digite novamente sua senha </Text>
              <TextInput
                onChangeText={(senhaVerificar) => {this.setState({senhaVerificar})}}
                value={this.state.senhaVerificar}
                secureTextEntry
                placeholder="Digite novamente a senha"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Digite seu e-mail </Text>
              <TextInput
                onChangeText={(email) => {this.props.modificaEmail(email)}}
                value={this.props.email}
                placeholder="Digite seu e-mail"
                style={styles.textInput}
                autoCapitalize="none"
              />

              <Text style={styles.textoInformativoInputs}> Número para contato principal (Somente números) </Text>
              <TextInputMask
                type={'cel-phone'}
                options={{maskType: 'BRL', withDDD: true, dddMask: '(99)'}}
                value={this.props.celularPrincipal}
                onChangeText={celular => {this.props.modificaCelularPrincipal(celular)}}
                placeholder="Digite seu número para contato com DDD"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Número para contato reserva (Somente números) </Text>
              <TextInputMask
                type={'cel-phone'}
                options={{maskType: 'BRL', withDDD: true, dddMask: '(99)'}}
                value={this.props.celularSecundario}
                onChangeText={celularSecundario => {this.props.modificaCelularSecundario(celularSecundario)}}
                placeholder="Digite seu número para contato com DDD"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Digite seu endereço completo </Text>
              <TextInput
                onChangeText={(endereco) => {this.props.modificaEndereco(endereco)}}
                value={this.props.endereco}
                placeholder="Digite seu endereço"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Digite sua cidade e estado ex: Salgueiro-PE </Text>
              <TextInput
                onChangeText={(cidadeEstado) => {this.props.modificaCidadeEstado(cidadeEstado)}}
                value={this.props.cidadeEstado}
                placeholder="Digite sua cidade e estado"
                style={styles.textInput}
              />

              <Text style={styles.textoInformativoInputs}> Escolha o melhor dia para o pagamento da fatura </Text>
              <TextInput
                onChangeText={(diaPagamento) => {this.props.modificaDiaPagamento(diaPagamento)}}
                value={this.props.diaPagamento}
                placeholder="Escolha o melhor dia entre 1 e 31"
                keyboardType={'numeric'}
                style={styles.textInput}
                maxLength={2}
              />

            </View>

            <View style={styles.containerBotoesErro}>
              <View>
                {this.renderErro()}
              </View>

              <View>
                {this.renderBotaoCadastrar()}
              </View>

              <View>
                {this.mensagemSucesso()}
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.CadastroReducer.nome,
  cpf: state.CadastroReducer.cpf,
  senha: state.CadastroReducer.senha,
  email: state.CadastroReducer.email,
  celularPrincipal: state.CadastroReducer.celularPrincipal,
  celularSecundario: state.CadastroReducer.celularSecundario,
  endereco: state.CadastroReducer.endereco,
  cidadeEstado: state.CadastroReducer.cidadeEstado,
  diaPagamento: state.CadastroReducer.diaPagamento,
  carregamentoCadastrar: state.CadastroReducer.carregamentoCadastrar,
  erro: state.CadastroReducer.erro,
  sucesso: state.CadastroReducer.sucesso
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 25
  },
  logo: {
    width: 180,
    height: 180
  },
  textoInformativo: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  containerInputBotao: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: '#3258A4',
    paddingTop: 40
  },
  textoInformativoInputs: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 5
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
  botaoFuncoes: {
    marginRight: 70,
    marginLeft: 70,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  textoFuncoes: {
    color:'#3258A4',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  containerBotoesErro: {
    paddingBottom: 25,
    flex: 2,
    backgroundColor: '#3258A4'
  },
  erro: {
    color: '#ff0000',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  containerErro: {
    paddingTop: 10
  },
  distanciaTextoInformativo: {
    paddingBottom: 25
  }
});

export default connect(mapStateToProps, {
  modificaNome,
  modificaCPF,
  modificaSenha,
  modificaEmail,
  modificaCelularPrincipal,
  modificaCelularSecundario,
  modificaEndereco,
  modificaCidadeEstado,
  modificaDiaPagamento,
  fazerCadastro,
  sucessoCadastro
})(Cadastro);
