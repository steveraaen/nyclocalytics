
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Details from './Details.js'
import get from './helpers'

export default class HomeScreen extends Component {
    static navigationOptions = {
    title: 'NYC Location Analysis',
  };
  constructor(props) {
    super(props);
    this.state={
      input: "Madison Square Garden"
    }  
    this.getData = this.getData.bind(this)
/*    this.handlePress = this.handlePress.bind(this)*/
    }
  getData() {


  }
 componentWillMount() {
      get().then((response) => {
      console.log(response)
      this.setState({
        aspSigns: response[0],
        busStops: response[1],
        parkingMeters: response[2],
      })
    })
 }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.greeting}>
        <TouchableOpacity
          onPress={() => navigate('Details')}
         
          title= "Details" >
          <Text style={{fontSize: 24, color: 'white'}}>
            hello
          </Text>
        </TouchableOpacity>
        </View>  
        <View style={styles.searchBar}> 
          <View style = {styles.searchBarInput}>
            <TextInput 
              style={{textAlign: 'center', fontSize: 20, color: 'black', backgroundColor: 'white'}}
              placeholder="Madison Square Garden"
            />
        </View>
        </View>
          <View style={styles.resultsContainer}> 

              <View style={styles.card}><Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}></Text></View>
              <View style={styles.card}><Text>Box 1</Text></View>
              <View style={styles.card}><Text>Box 1</Text></View>
              <View style={styles.card}><Text>Box 1</Text></View>         
          </View>
      </View>
    ) 
  }
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#03003F',
    padding: 10
  },
// -------------------- greeting parent
  greeting: {
    marginTop: 8,
    marginBottom: 4,
    flex: .08,
    backgroundColor:'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
// --------------------- searchbar parent
    searchBar: {
    marginTop: 12,
    flex: .1,
    justifyContent: 'center',
    backgroundColor:'gray',
  },
    searchBarInput: {
     height: 36,
     paddingTop:4,
     paddingBottom:4,
     backgroundColor: 'white'
    },
// -------------------------results parent
    resultsContainer: {
      marginTop:12,
      paddingTop:22,
      flex: .8,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'coral'
    },
    card: {
      backgroundColor: 'black',
      height: 150,
      width: 150,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }

});
const nyclocalytics = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: Details },
});

AppRegistry.registerComponent('nyclocalytics', () => nyclocalytics);














