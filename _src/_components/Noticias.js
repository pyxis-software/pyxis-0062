import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';

class Noticias extends Component{

  constructor(props){
    super(props);
    this.state = {
      dados: ["Texto da notícia aqui", "Texto da notícia aqui"]
    }
  }

  renderizaNoticias({item}){

    return(
      <View style={styles.container}>
        <Text style={styles.noticias}> {item} </Text>
      </View>
    );

  }

  renderNoticias(){
    return(
      <View>
        <FlatList
          data={this.state.dados}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => this.renderizaNoticias({item})}
        />
      </View>
    );
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

});

const styles = StyleSheet.create({
  noticias: {
    fontSize: 15,
    paddingTop: 5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: "#3258A4",
    backgroundColor: "#E8E8E8"
  }
});

export default connect(mapStateToProps, {})(Noticias);
