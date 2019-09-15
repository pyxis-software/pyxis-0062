import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
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
          <Text style={styles.descricao}> Aqui ficará a descrição sobre a empresa. Coisas como: logomarca, objetivos, etc. </Text>
        </View>


        <View style={styles.containerInformacoesEmpresa}>

          <View style={styles.direcaoItens}>
            <Image source={House} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> Endereço da empresa </Text>
          </View>

          <View style={styles.direcaoItens}>
            <Image source={Fone} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> Contato da empresa </Text>
          </View>

          <View style={styles.direcaoItens}>
            <Image source={Mail} style={styles.logoInformacoesEmpresa} />
            <Text style={styles.textoInformacoes}> E-mail da empresa </Text>
          </View>

        </View>

      </View>
    );
  }
}

const mapStateToProps = state => ({

});

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
    backgroundColor: "#E8E8E8"
  },
  descricao: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center'
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
