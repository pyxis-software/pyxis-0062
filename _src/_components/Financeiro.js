import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Financeiro extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: [
        {id: 1, data: "Janeiro 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 2, data: "Fevereiro 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 3, data: "Março 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 4, data: "Abril 2019", situacao: "PAGO", valor: "R$ 60,00", plano: "120MB"},
        {id: 5, data: "Maio 2019", situacao: "EM ABERTO", valor: "R$ 60,00", plano: "120MB"},
        {id: 6, data: "Junho 2019", situacao: "EM ABERTO", valor: "R$ 60,00", plano: "120MB"},
        {id: 7, data: "Julho 2019", situacao: "VENCIDO", valor: "R$ 60,00", plano: "120MB"},
        {id: 8, data: "Agosto 2019", situacao: "VENCIDO", valor: "R$ 60,00", plano: "120MB"}
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
    }else if (item.situacao === "EM ABERTO"){
      return(
        <View style={styles.containerEmAberto}>
          <TouchableOpacity onPress={() => {Actions.pagamento({title: item.data, situacao: item.situacao, valor: item.valor, plano: item.plano})}}>
            <Text style={styles.data}> {item.data} </Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View style={styles.containerVencido}>
          <TouchableOpacity onPress={() => {Actions.pagamento({title: item.data, situacao: item.situacao, valor: item.valor, plano: item.plano})}}>
            <Text style={styles.data}> {item.data} </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderFinanceiro(){
    return(
      <ScrollView>

        <View style={styles.informacoesPagamento}>
          <Icon name="fiber-manual-record" size={15} color="#49BD78" />
          <Text style={[styles.informacoesPagamentoTexto, {color: '#49BD78'}]}> Pago </Text>

          <Icon name="fiber-manual-record" size={15} color="#F7AA34" />
          <Text style={[styles.informacoesPagamentoTexto, {color: '#F7AA34'}]}> Em aberto </Text>

          <Icon name="fiber-manual-record" size={15} color="#EC3C3D" />
          <Text style={[styles.informacoesPagamentoTexto, {color: '#EC3C3D'}]}> Vencido </Text>
        </View>

        <FlatList
          data={this.state.dados}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderizaFinanceiro({item})}
        />
      </ScrollView>
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

const mapStateToProps = state => ({});

const styles = StyleSheet.create({
  data: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  containerVencido: {
    flex: 1,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#EC3C3D",
    backgroundColor: "#EC3C3D",
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
    borderColor: "#49BD78",
    backgroundColor: "#49BD78",
    justifyContent: 'center'
  },
  containerEmAberto: {
    flex: 1,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F7AA34",
    backgroundColor: "#F7AA34",
    justifyContent: 'center'
  },
  informacoesPagamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50
  },
  informacoesPagamentoTexto: {
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps, {})(Financeiro);
