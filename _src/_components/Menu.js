import React, {Component} from 'react';
import {View, StyleSheet, Image, Button, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LogoJuniorNet = require('../_imagens/JuniorNET.png');

class Menu extends Component{
  render(){
    return(
      <View style={styles.containerPrincipal}>

        <View style={styles.containerLogo}>
          <Image source={LogoJuniorNet} style={styles.logo} />
        </View>

        <View style={styles.containerTodasOpcoes}>
          <View style={styles.containerOpcoes1}>

            <TouchableOpacity onPress={() => {Actions.telaUsuario()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="person" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Meus Dados </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.financeiro()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="attach-money" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Financeiro</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.noticias()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="notifications-active" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Notícias </Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.containerOpcoes2}>

            <TouchableOpacity onPress={() => {Actions.planos()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="subject" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Planos </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.chat()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="chat" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Chat </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {Actions.sobre()}} underlayColor="white">
              <View style={styles.opcoes}>
                <Icon name="info" size={50} color="#fff" style={styles.icones} />
                <Text style={styles.textoOpcoes}> Sobre </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <Button title="Sair" onPress={() => {Actions.popTo("inicial")}} color="#3258A4" />

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
    flex: 2,
    paddingTop: 30,
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 180
  },
  containerOpcoes1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  opcoes: {
    width: 100,
    height: 100,
    backgroundColor: '#3258A4',
    borderRadius: 10,
    alignItems: 'center'
  },
  containerOpcoes2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textoOpcoes: {
    color: '#fff',
    textAlign: 'center'
  },
  icones: {
    paddingBottom: 8,
    paddingTop: 10
  },
  containerTodasOpcoes: {
    flex: 3
  }
});

export default connect(mapStateToProps, {})(Menu);
