import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {buscaFinanceiro} from '../_actions/FinanceiroActions';

class Financeiro extends Component{

  componentWillMount(){
    const {cpf} = this.props;
    this.props.buscaFinanceiro({cpf});
  }

  renderizaFinanceiro({item}){
    if(item.status == "Pago"){
      return(
        <View style={styles.containerPago}>
            <Text style={styles.data}> {item.mes} </Text>
        </View>
      );
    }else if (item.status == "Pendente"){
      return(
        <View style={styles.containerEmAberto}>
          <TouchableOpacity onPress={() => {Actions.pagamento({
              title: item.mes,
              situacao: item.status,
              valor: item.valor,
              linkBoleto: item.link,
              vencimento: item.vencimento,
              codigoBarras: item.barcode
            })}}>
            <Text style={styles.data}> {item.mes} </Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View style={styles.containerVencido}>
          <TouchableOpacity onPress={() => {Actions.pagamento({
              title: item.mes,
              situacao: item.status,
              valor: item.valor,
              vencimento: item.vencimento
            })}}>
            <Text style={styles.data}> {item.mes} </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _renderFlatlistOrLoading(){
    if(this.props.indicadorFinanceiro){
      return(
        <ActivityIndicator size="large" color="#3258A4" style={styles.indicador} />
      );
    }else{
      return(
        <View>
          <View style={styles.informacoesPagamento}>
            <Icon name="fiber-manual-record" size={15} color="#49BD78" />
            <Text style={[styles.informacoesPagamentoTexto, {color: '#49BD78'}]}> Pago </Text>

            <Icon name="fiber-manual-record" size={15} color="#F7AA34" />
            <Text style={[styles.informacoesPagamentoTexto, {color: '#F7AA34'}]}> Em aberto </Text>

            <Icon name="fiber-manual-record" size={15} color="#EC3C3D" />
            <Text style={[styles.informacoesPagamentoTexto, {color: '#EC3C3D'}]}> Vencido </Text>
          </View>

          <FlatList
            data={this.props.dados}
            extraData={this.state}
            keyExtractor={item => item.id}
            renderItem={({item}) => this.renderizaFinanceiro({item})}
          />
        </View>
      );
    }
  }

  renderFinanceiro(){
    return(
      <ScrollView>
        <View>
          {this._renderFlatlistOrLoading()}
        </View>
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

const mapStateToProps = state => ({
  cpf: state.FinanceiroReducer.cpf,
  dados: state.FinanceiroReducer.dados,
  indicadorFinanceiro: state.FinanceiroReducer.indicadorFinanceiro
});

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
  },
  indicador: {
    marginTop: 25
  },
});

export default connect(mapStateToProps, {buscaFinanceiro})(Financeiro);
