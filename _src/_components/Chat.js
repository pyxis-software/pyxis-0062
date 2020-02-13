import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import firebase from 'firebase';
import moment from 'moment';

import {modificaMensagem, enviarMensagem} from '../_actions/ChatActions';

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      dados: [],
      carregamento: false
    }
  }

  componentWillMount(){
    cpf = this.props.cpf;
    cpf = cpf.replace(/\./g, "");
    cpf = cpf.replace("-", "");

    firebase.database().ref("/mensagens/" + cpf + "/juniorNet").on("value", snapshot => {
      if(snapshot.val() == null){
        this.setState({dados: [{tipo: 1, mensagem: "Nenhuma mensagem encontrada."}], carregamento: true});
      }else{
        let vetorInvertido = Object.values(snapshot.val()).slice(0).reverse();
        this.setState({dados: vetorInvertido, carregamento: true});
      }
    });
  }

  _enviarMensagem(){
    const {mensagem, cpf, nome, email} = this.props;
    if(mensagem != ''){
      let horario = moment().utcOffset('-03:00').format('HH:mm');
      this.props.enviarMensagem(mensagem, cpf, nome, email, horario);
    }
  }

  renderizaMensagens({item}){
    if (item.tipo === 'envio') {
      return(
        <View style={styles.containerEnvio}>
          <Text style={styles.textoEnvio}> {item.mensagem} </Text>
          <Text style={{fontSize: 12, color: '#696969'}}> {item.horario} </Text>
        </View>
      );
    }else if(item.tipo === 'recebimento'){
      return(
        <View style={styles.containerRecebimento}>
          <Text style={styles.textoRecebimento}> {item.mensagem} </Text>
          <Text style={{fontSize: 12, color: '#696969'}}> {item.horario} </Text>
        </View>
      );
    }else if(item.tipo === 1){
      return(
        <View>
          <Text style={styles.mensagemVazio}> {item.mensagem} </Text>
        </View>
      );
    }
  }

  renderPrincipal(){
    if(this.state.carregamento){
      return(
        <FlatList
          data={this.state.dados}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          inverted
          renderItem={({item}) => this.renderizaMensagens({item})}
        />
      );
    }else{
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#3258A4" />
        </View>
      );
    }
  }

  render(){
    return(
      <View style={styles.containerPrincipal}>
        <View style={styles.containerMensagens}>
          {this.renderPrincipal()}
        </View>

        <View style={styles.containerComandos}>

          <TextInput
            style={styles.input}
            value={this.props.mensagem}
            placeholder="Digite aqui..."
            onChangeText={texto => this.props.modificaMensagem(texto)}
          />

          <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor={'transparent'}>
            <Icon name="send" size={50} color="#3258A4" style={styles.botaoEnviar} />
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#EEE9E9",
    padding: 10
  },
  containerMensagens: {
    flex: 1,
    paddingBottom: 20
  },
  containerComandos: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center'
  },
  input: {
    flex: 4,
    backgroundColor: "#fff",
    fontSize: 18,
    borderRadius: 5
  },
  containerEnvio: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40
  },
  textoEnvio: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    backgroundColor: '#dbf5b4',
    elevation: 1,
    borderRadius: 5
  },
  containerRecebimento: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40
  },
  textoRecebimento: {
    fontSize: 18,
    color: '#000',
    padding: 10,
    backgroundColor: '#f7f7f7',
    elevation: 1,
    borderRadius: 5
  },
  mensagemVazio: {
    fontSize: 15,
    color: '#3258A4',
    fontWeight: 'bold',
    marginTop: 10
  },
  botaoEnviar: {
    marginLeft: 5
  }
});

mapStateToProps = state => ({
  mensagem: state.ChatReducer.mensagem,
  cpf: state.ChatReducer.cpf,
  nome: state.ChatReducer.nome,
  email: state.ChatReducer.email
});

export default connect(mapStateToProps, {modificaMensagem, enviarMensagem})(Chat);
