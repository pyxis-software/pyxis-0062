import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TelaUsuario extends Component{
  render(){
    return(
      <View style={styles.containerPrincipal}>
        <ScrollView style={styles.containerInformacoesAdicionais}>

          <View style={styles.linhasInformacoes}>
            <Icon name="person" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.nome} </Text>
          </View>

          <View style={styles.linhasInformacoes}>
            <Icon name="assignment" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.cpf} </Text>
          </View>

          <View style={styles.linhasInformacoes}>
            <Icon name="room" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.endereco} </Text>
          </View>

          <View style={styles.linhasInformacoes}>
            <Icon name="room" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.cidade}  </Text>
          </View>

          <View style={styles.linhasInformacoes}>
            <Icon name="call" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.telefone1} </Text>
          </View>

          <View style={styles.linhasInformacoes}>
            <Icon name="call" size={30} color="#3258A4" style={styles.icones} />
            <Text style={styles.textoInformacoesAdicionais}> {this.props.telefone2} </Text>
          </View>

          <View style={styles.containerBotoes}>
            <TouchableOpacity
              style={styles.botaoFuncoes}
              onPress={() => {Actions.alterarSenha({cpf: this.props.cpf})}}
              underlayColor='#fff'>
              <Text style={styles.textoFuncoes}> Alterar Senha </Text>
            </TouchableOpacity>

            <View style={{paddingTop: 25}}>
              <TouchableOpacity
                style={styles.botaoFuncoes}
                onPress={() => {Actions.popTo("inicial")}}
                underlayColor='#fff'>
                <Text style={styles.textoFuncoes}> Sair </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cpf: state.TelaUsuarioReducer.cpf,
  nome: state.TelaUsuarioReducer.nome,
  endereco: state.TelaUsuarioReducer.endereco,
  cidade: state.TelaUsuarioReducer.cidade,
  telefone1: state.TelaUsuarioReducer.telefone1,
  telefone2: state.TelaUsuarioReducer.telefone2,
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerInformacoesAdicionais: {
    flex: 8,
    backgroundColor: '#E8E8E8'
  },
  textoInformacoesAdicionais: {
    padding: 15
  },
  botaoFuncoes: {
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
  textoFuncoes: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  containerBotoes: {
    paddingTop: 20
  },
  icones: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15
  },
  linhasInformacoes: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps, {})(TelaUsuario);
