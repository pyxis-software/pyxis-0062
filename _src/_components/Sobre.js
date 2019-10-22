import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Linking} from 'react-native';
import {connect} from 'react-redux';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');
const Fone = require('../_imagens/Fone.png');
const House = require('../_imagens/House.png');
const Mail = require('../_imagens/Mail.png');

class Sobre extends Component{
  render(){
    return(
      <View style={styles.containerPrincipal}>
        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerDescricao}>
          <Text style={styles.descricao}>
            Texto é um conjunto de palavras e frases
            encadeadas que permitem interpretação e
            transmitem uma mensagem. É qualquer obra escrita
            em versão original e que constitui um livro ou um documento escrito.
            Um texto é uma unidade linguística de extensão superior à frase.
          </Text>
        </View>

        <View style={styles.containerInformacoesEmpresa}>

          <View style={styles.direcaoItens}>
            <Image source={House} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> Rua São Vicente, 1584, 10º Andar </Text>
          </View>

          <TouchableOpacity style={styles.direcaoItens} onPress={() => {/*Linking.openURL(`tel:${this.props.telefone}`)*/}}>
            <Image source={Fone} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> (87)91234-5678 </Text>
          </TouchableOpacity>

          <View style={styles.direcaoItens}>
            <Image source={Mail} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> softwarepyxis@gmail.com </Text>
          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 138,
    height: 138,
    marginTop: 10
  },
  containerDescricao: {
    flex: 1,
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: "#fff",
    backgroundColor: "#3258A4"
  },
  descricao: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
    color: '#fff'
  },
  containerInformacoesEmpresa: {
    flex: 1.5
  },
  logoInformacoesEmpresa: {
    width: 50,
    height: 50
  },
  direcaoItens: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 15,
    alignItems: 'center'
  },
  textoInformacoes: {
    paddingLeft: 10
  }
});

export default connect(mapStateToProps, {})(Sobre);
