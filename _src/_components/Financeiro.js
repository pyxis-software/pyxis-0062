import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Picker} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {buscaFinanceiro} from '../_actions/FinanceiroActions';

class Financeiro extends Component{

  constructor(props){
    super(props);
    this.state = {
      selected: ''
    }
  }

  componentWillMount(){
    const {cpf} = this.props;
    this.props.buscaFinanceiro({cpf});
  }

  renderizaFinanceiro({item}){
    if(this.state.selected == "pago"){
      if(item.status == "Pago"){
        return(
          <View style={styles.containerPago}>
              <Text style={styles.data}> {item.mes} </Text>
          </View>
        );
      }
    }else if(this.state.selected == "em aberto"){
      if(item.status == "Pendente"){
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
        }
    }else if(this.state.selected == "vencido"){
      if(item.status == "Vencido ou Cancelado"){
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
    }else{
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
  }

  _renderFlatlistOrLoading(){
    if(this.props.indicadorFinanceiro){
      return(
        <ActivityIndicator size="large" color="#3258A4" style={styles.indicador} />
      );
    }else{
      if(this.props.dados.length == 0){
        return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#3258A4'}}> Nenhuma fatura encontrada. </Text>
          </View>
        );
      }else{
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

            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Picker
                selectedValue={this.state.selected}
                style={{height: 50, width: 330}}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({selected: itemValue});
                }}>
                  <Picker.Item label="Mostrar todos os boletos..." value="todos" />
                  <Picker.Item label="Boleto(s) Pago(s)" value="pago" />
                  <Picker.Item label="Boleto(s) Em aberto" value="em aberto" />
                  <Picker.Item label="Boleto(s) Vencido(s)" value="vencido" />
              </Picker>
            </View>

            <FlatList
              data={this.props.dados}
              extraData={this.state}
              keyExtractor={item => item.id}
              renderItem={({item}) => this.renderizaFinanceiro({item})}
            />
          </ScrollView>
        );
      }
    }
  }

  render(){
    return(
      <View style={{flex: 1}}>
        {this._renderFlatlistOrLoading()}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(mapStateToProps, {buscaFinanceiro})(Financeiro);
