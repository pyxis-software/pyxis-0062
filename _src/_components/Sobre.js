import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Linking, TouchableOpacity, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');
const Fone = require('../_imagens/Fone.png');
const House = require('../_imagens/House.png');
const Mail = require('../_imagens/Mail.png');

import {mostrarInformacoesEmpresa} from '../_actions/SobreActions';

class Sobre extends Component{

  componentWillMount(){
    this.props.mostrarInformacoesEmpresa();
  }

  render(){
    if(this.props.carregamento){
      return(
        <View>
          <ActivityIndicator size="large" color="#3258A4" style={styles.indicador} />
        </View>
      );
    }else{
      return(
        <View style={styles.containerPrincipal}>
          <View style={styles.containerLogo}>
            <Image source={LogoJuniorNet} style={styles.logo} />
          </View>

          <View style={styles.containerDescricao}>
            <Text style={styles.descricao}> {this.props.dados.descricao} </Text>
          </View>

          <View style={styles.containerInformacoesEmpresa}>
            <TouchableOpacity style={styles.direcaoItens} onPress={() => {Linking.openURL('google.navigation:q=' + this.props.dados.endereco)}}>
              <Image source={House} style={styles.logoInformacoesEmpresa} />
              <Text style={styles.textoInformacoes}> {this.props.dados.endereco} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.direcaoItens} onPress={() => {Linking.openURL(`tel:${this.props.dados.telefone}`)}}>
              <Image source={Fone} style={styles.logoInformacoesEmpresa} />
              <Text style={styles.textoInformacoes}> {this.props.dados.telefone} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.direcaoItens} onPress={() => {Linking.openURL('mailto:' + this.props.dados.email)}}>
              <Image source={Mail} style={styles.logoInformacoesEmpresa} />
              <Text style={styles.textoInformacoes}> {this.props.dados.email} </Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
              <Text style={{fontWeight: 'bold', color: '#3258A4'}}> Clique para mais informações! </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  dados: state.SobreReducer.dados,
  carregamento: state.SobreReducer.carregamento
});

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLogo: {
    flex: .8,
    alignItems: 'center'
  },
  logo: {
    width: 138,
    height: 138,
    marginTop: 10
  },
  containerDescricao: {
    flex: .8,
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
    padding: 10,
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

export default connect(mapStateToProps, {mostrarInformacoesEmpresa})(Sobre);
