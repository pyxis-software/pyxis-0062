import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class Pagamento extends Component{

  render(){
    return(
      <View style={styles.containerPrincipal}>

        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerInformacoes}>

          <View style={styles.containerTextos}>

            <Text style={styles.planoPagamento}> Plano: {this.props.plano} </Text>

            <Text style={styles.valorPagamento}> Valor:
              <Text style={styles.valorDestaque}> {this.props.valor} </Text>
            </Text>

            <Text style={styles.situacaoPagamento}> Situação:
              <Text style={styles.situacaoDestaque}> {this.props.situacao} </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => Actions.pop()}
            underlayColor='#fff'>
              <Text style={styles.textoEntrar}>Fechar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoBoleto}
            onPress={() => {return false}}
            underlayColor='#fff'>
              <Text style={styles.textoBoleto}>Gerar Boleto</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const mapStateToProps = state => ({

});

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
  botaoBoleto: {
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
  valorPagamento: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  situacaoPagamento: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  situacaoDestaque: {
    color: '#FF4500'
  },
  planoPagamento: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  containerTextos: {
    alignItems: 'center'
  },
  valorDestaque: {
    color: '#228B22'
  }
});

export default connect(mapStateToProps, {})(Pagamento);
