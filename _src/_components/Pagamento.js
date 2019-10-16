import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Clipboard, Alert, Linking} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class Pagamento extends Component{

  renderStatus(){
    if(this.props.situacao == "Vencido ou Cancelado"){
      return(
        <Text style={styles.tituloInformacoes}> Situação:
          <Text style={styles.situacaoVencido}> {this.props.situacao} </Text>
        </Text>
      );
    }else{
      return(
        <Text style={styles.tituloInformacoes}> Situação:
          <Text style={styles.situacaoEmAberto}> {this.props.situacao} </Text>
        </Text>
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
            <Text style={styles.textoBoletoVencido}> O seu boleto está vencido! Entre em contato com o suporte para resolver o problema. </Text>
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

          <View style={styles.containerTextos}>
            <Text style={styles.tituloInformacoes}> Vencimento:
              <Text style={styles.destaque}> {this.props.vencimento} </Text>
            </Text>

            <View>
              {this.renderStatus()}
            </View>

            <Text style={styles.tituloInformacoes}> Valor:
              <Text style={styles.destaque}> R$ {this.props.valor} </Text>
            </Text>

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
    fontWeight: 'bold',
    paddingBottom: 20
  },
  situacaoVencido: {
    color: '#FF4500'
  },
  situacaoEmAberto: {
    color: '#F7AA34'
  },
  planoPagamento: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  containerTextos: {
    alignItems: 'center'
  },
  destaque: {
    color: '#228B22'
  },
  containerBotaoFechar: {
    paddingTop: 25
  },
  containerBoletoVencido: {
    padding: 10
  },
  textoBoletoVencido: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#EC3C3D'
  }
});

export default connect(mapStateToProps, {})(Pagamento);
