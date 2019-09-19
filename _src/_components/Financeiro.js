import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Financeiro extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: [
        {id: 1, data: "Setembro 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 2, data: "Outubro 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 3, data: "Novembro 2019", situacao: "EM ABERTO", valor: "R$ 60,00", plano: "120MB"},
        {id: 4, data: "Dezembro 2019", situacao: "EM ABERTO", valor: "R$ 60,00", plano: "120MB"}
      ]
    }
  }

  renderizaFinanceiro({item}){
    if(item.situacao === "PAGO"){
      return(
        <View style={styles.containerPago}>
            <Text style={styles.data}> {item.data} </Text>
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {Actions.pagamento({title: item.data, situacao: item.situacao, valor: item.valor, plano: item.plano})}}>
            <Text style={styles.data}> {item.data} </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderFinanceiro(){
    return(
      <View>
        <FlatList
          data={this.state.dados}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderizaFinanceiro({item})}
        />
      </View>
    );
  }

  render(){
    return(
      <View>
        {this.renderFinanceiro()}
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const styles = StyleSheet.create({
  data: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#3258A4",
    backgroundColor: "#3258A4",
    justifyContent: 'center'
  },
  containerPago: {
    flex: 1,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#228B22",
    backgroundColor: "#228B22",
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, {})(Financeiro);
