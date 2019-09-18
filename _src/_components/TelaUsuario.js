import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class TelaUsuario extends Component{
  render(){
    return(
      <View style={styles.containerPrincipal}>

        <View style={styles.containerInformacoesUsuario}>
          <Text style={styles.textoInformacoesUsuario}> {this.props.nome} </Text>
          <Text style={styles.textoInformacoesUsuario}> {this.props.cpf} </Text>
        </View>

        <View style={styles.containerInformacoesAdicionais}>
          <Text style={styles.textoInformacoesAdicionais}> Endereço: {this.props.endereco} </Text>
          <Text style={styles.textoInformacoesAdicionais}> Cidade: {this.props.cidade}  </Text>
          <Text style={styles.textoInformacoesAdicionais}> Contato: {this.props.telefone1} </Text>
          <Text style={styles.textoInformacoesAdicionais}> Contato: {this.props.telefone2} </Text>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => {return false}}
            underlayColor='#fff'>
            <Text style={styles.textoEntrar}> Alterar Senha </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => {return false}}
            underlayColor='#fff'>
            <Text style={styles.textoEntrar}> Sair </Text>
          </TouchableOpacity>
        </View>

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
  containerInformacoesUsuario: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3258A4'
  },
  containerInformacoesAdicionais: {
    flex: 8,
    backgroundColor: '#E8E8E8'
  },
  textoInformacoesUsuario: {
    color: '#fff',
    fontSize: 17,
    padding: 3,
    fontWeight: 'bold'
  },
  textoInformacoesAdicionais: {
    padding: 15
  },
  botaoEntrar: {
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
  textoEntrar: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});

export default connect(mapStateToProps, {})(TelaUsuario);
