import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';

import {connect} from 'react-redux';

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
          <Text style={styles.titulo}> Plano de {item.titulo} </Text>
          <Text style={styles.descricao}> {item.descricao} </Text>
          <Text style={styles.valor}> R$ {item.valor} Reais </Text>
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <Text style={styles.titulo}> Plano de {item.titulo} </Text>
          <Text style={styles.descricao}> {item.descricao} </Text>
          <Text style={styles.valor}> R$ {item.valor} Reais </Text>
        </View>
      );
    }
  }

  renderPlanos(){
    if(this.props.carregamento){
      return(
        <View>
          <ActivityIndicator size="large" color="#3258A4" style={styles.indicador} />
        </View>
      );
    }else{
      return(
        <View>
          <FlatList
            data={this.props.dados}
            extraData={this.state}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderizaPlanos({item})}
          />
        </View>
      );
    }
  }

  render(){
    return(
      <View>
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
    fontSize: 15,
    paddingTop: 5,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  },
  valor: {
    fontSize: 15,
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
  indicador: {
    marginTop: 25
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
});

const mapStateToProps = state => ({
  cpf: state.PlanosReducer.cpf,
  dados: state.PlanosReducer.dados,
  carregamento: state.PlanosReducer.carregamento,
});

export default connect(mapStateToProps, {mostrarPlanos})(Planos);
