import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';

class Planos extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: [
        {id: 1, titulo: "Título do Plano 1", descricao: "Aqui será descrito o tipo de plano e velocidade referente ao mesmo.", valor: "R$ Valor do Plano 1"},
        {id: 2, titulo: "Título do Plano 2", descricao: "Aqui será descrito o tipo de plano e velocidade referente ao mesmo.", valor: "R$ Valor do Plano 2"},
        {id: 3, titulo: "Título do Plano 3", descricao: "Aqui será descrito o tipo de plano e velocidade referente ao mesmo.", valor: "R$ Valor do Plano 3"},
        {id: 4, titulo: "Título do Plano 4", descricao: "Aqui será descrito o tipo de plano e velocidade referente ao mesmo.", valor: "R$ Valor do Plano 4"},
        {id: 5, titulo: "Título do Plano 5", descricao: "Aqui será descrito o tipo de plano e velocidade referente ao mesmo.", valor: "R$ Valor do Plano 5"},
      ]
    }
  }

  renderizaPlanos({item}){
    return(
      <View style={styles.container}>
        <Text style={styles.titulo}> {item.titulo} </Text>
        <Text style={styles.descricao}> {item.descricao} </Text>
        <Text style={styles.valor}> {item.valor} </Text>
      </View>
    );
  }

  renderPlanos(){
    return(
      <View>
        <FlatList
          data={this.state.dados}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderizaPlanos({item})}
        />
      </View>
    );
  }

  render(){
    return(
      <View>
        {this.renderPlanos()}
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

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
  }
});

export default connect(mapStateToProps, {})(Planos);
