import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import {mostrarNoticias} from '../_actions/NoticiasActions';

class Noticias extends Component{

  componentWillMount(){
    this.props.mostrarNoticias();
  }

  renderizaNoticias({item}){
    return(
      <View style={styles.container}>
        <Text style={styles.noticiasTitulo}> {item.titulo} </Text>
        <Text style={styles.noticiasDescricao}> {item.descricao} </Text>
      </View>
    );
  }

  renderNoticias(){
    if(this.props.indicadorNoticias){
      return(
        <View>
          <ActivityIndicator size="large" color="#3258A4" style={styles.indicador} />
        </View>
      );
    }else{
      if(this.props.dados.length == 0){
        return(
          <Text> Não há nada aqui! </Text>
        );
      }else{
        return(
          <FlatList
            data={this.props.dados}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.renderizaNoticias({item})}
          />
        );
      }
    }
  }

  render(){
    return(
      <View>
        {this.renderNoticias()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dados: state.NoticiasReducer.dados,
  indicadorNoticias: state.NoticiasReducer.indicadorNoticias,
});

const styles = StyleSheet.create({
  noticiasDescricao: {
    fontSize: 14,
    padding: 10,
    color: '#fff'
  },
  noticiasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    color: '#fff'
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
});

export default connect(mapStateToProps, {mostrarNoticias})(Noticias);
