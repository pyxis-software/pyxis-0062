import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Clipboard, Alert, Linking} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class Pagamento extends Component{

  renderStatus(){
    if(this.props.situacao == "Vencido ou Cancelado"){
      return(
        <View style={styles.containerTitulos}>
          <Text style={styles.tituloInformacoes}> Situação: </Text>
          <Text style={styles.situacaoVencido}> {this.props.situacao} </Text>
        </View>
      );
    }else{
      return(
        <View style={styles.containerTitulos}>
          <Text style={styles.tituloInformacoes}> Situação: </Text>
          <Text style={styles.situacaoEmAberto}> {this.props.situacao} </Text>
        </View>
      );
    }
  }

  renderBotoesBoleto(){
    if(this.props.situacao != "Vencido ou Cancelado"){
      return(
        <View>
          <TouchableOpacity
            style={styles.botaoPagamento}
            onPress={() => {Linking.openURL(this.props.linkBoleto)}}
            underlayColor='#fff'>
              <Text style={styles.textoBoleto}>Baixar Boleto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoPagamento}
            onPress={() => {
              Clipboard.setString(this.props.codigoBarras);
              Alert.alert(
                'Código Copiado com Sucesso',
                'Agora abra o aplicativo do seu banco ou financeira e efetue o pagamento!',
                [{text: 'Fechar'}],
                {cancelable: false},
              );
            }}
            underlayColor='#fff'>
              <Text style={styles.textoBoleto}>Copiar Código de Barras</Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View>
          <View style={styles.containerBoletoVencido}>
            <Text style={styles.textoBoletoVencido}> Este boleto está vencido! Entre em contato com o nosso suporte para resolver o problema. </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoPagamento}
            onPress={() => {Actions.chat()}}
            underlayColor='#fff'>
              <Text style={styles.textoBoleto}>Contactar o Suporte</Text>
          </TouchableOpacity>
        </View>
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

          <View>
            <View style={styles.containerTitulos}>
              <Text style={styles.tituloInformacoes}> Vencimento: </Text>
              <Text style={{fontWeight: 'bold'}}> {this.props.vencimento} </Text>
            </View>

            <View>
              {this.renderStatus()}
            </View>

            <View style={styles.containerTitulos}>
              <Text style={styles.tituloInformacoes}> Valor: </Text>
              <Text style={{fontWeight: 'bold'}}> R$ {this.props.valor} </Text>
            </View>
          </View>

          <View>
            {this.renderBotoesBoleto()}
          </View>

          <View style={styles.containerBotaoFechar}>
            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={() => Actions.pop()}
              underlayColor='#fff'>
                <Text style={styles.textoEntrar}>Fechar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1
  },
  containerInformacoes: {
    flex: 5
  },
  containerLogo: {
    flex: 2,
    paddingTop: 30,
    alignItems: 'center'
  },
  logo: {
    width: 135,
    height: 135
  },
  botaoEntrar: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#3258A4',
    borderColor: '#3258A4',
    borderRadius: 10,
    borderWidth: 1
  },
  textoEntrar: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  botaoPagamento: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
    borderRadius: 10,
    borderWidth: 1
  },
  textoBoleto: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  tituloInformacoes: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  situacaoVencido: {
    color: '#FF4500',
    fontWeight: 'bold'
  },
  situacaoEmAberto: {
    color: '#F7AA34',
    fontWeight: 'bold'
  },
  planoPagamento: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  containerBotaoFechar: {
    paddingTop: 10
  },
  containerBoletoVencido: {
    padding: 10
  },
  textoBoletoVencido: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#EC3C3D'
  },
  containerTitulos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default connect(mapStateToProps, {})(Pagamento);
