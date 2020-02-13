import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {mostrarPlanos} from '../_actions/PlanosActions';

class Planos extends Component{

  componentWillMount(){
    const {cpf} = this.props;
    this.props.mostrarPlanos({cpf});
  }

  renderizaPlanos({item}){
    if(item.plano){
      return(
        <View style={styles.containerPlanoSelecionado}>
          <Text style={styles.titulo}> {item.titulo} </Text>
          <Text style={styles.descricao}> {item.descricao} </Text>
          <Text style={styles.valor}> R$ {item.valor} </Text>
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <Text style={styles.titulo}> {item.titulo} </Text>
          <Text style={styles.descricao}> {item.descricao} </Text>
          <Text style={styles.valor}> R$ {item.valor} </Text>
        </View>
      );
    }
  }

  renderPlanos(){
    if(this.props.carregamento){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#3258A4" />
        </View>
      );
    }else{
      return(
        <ScrollView>
          <View style={styles.informacoesPlanos}>
            <Icon name="fiber-manual-record" size={15} color="#3258A4" />
            <Text style={[styles.informacoesPlanosTexto, {color: '#3258A4'}]}> Disponível </Text>

            <Icon name="fiber-manual-record" size={15} color="#008B00" />
            <Text style={[styles.informacoesPlanosTexto, {color: '#008B00'}]}> Contratado </Text>
          </View>

          <FlatList
            data={this.props.dados}
            extraData={this.state}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderizaPlanos({item})}
          />
        </ScrollView>
      );
    }
  }

  render(){
    return(
      <View style={{flex: 1}}>
        {this.renderPlanos()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  descricao: {
    fontSize: 18,
    paddingTop: 5,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  },
  valor: {
    fontSize: 18,
    paddingTop: 15,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#3258A4",
    backgroundColor: "#3258A4"
  },
  containerPlanoSelecionado: {
    flex: 1,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#008B00",
    backgroundColor: "#008B00"
  },
  icones: {
    paddingBottom: 8,
    paddingTop: 10
  },
  informacoesPlanos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50
  },
  informacoesPlanosTexto: {
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
  cpf: state.PlanosReducer.cpf,
  dados: state.PlanosReducer.dados,
  carregamento: state.PlanosReducer.carregamento,
});

export default connect(mapStateToProps, {mostrarPlanos})(Planos);
