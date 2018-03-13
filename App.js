
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
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
import getAll from './helpers'

export default class HomeScreen extends Component {
    static navigationOptions = {
      header: null
  };
  constructor(props) {
    super(props);
    this.state={
      input: "Madison Square Garden"
    }  
    /*this.getData = this.getData.bind(this)*/
/*    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    }
      _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    }
    this.setState({
      appState: nextAppState,
    });*/
  }

 componentDidMount() {
  /*     AppState.addEventListener('change', this._handleAppStateChange);*/
      navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude]
            }, () => {
             getAll(this.state.longitude, this.state.latitude).then((response) => {      
              this.setState({
                citibikeStops: response[0],
                subwayStops: response[1],
                parkingASP: response[2],
                busStops: response[3],
                parkingMeters: response[4]
              })
            })
            })   

        }.bind(this))    
console.log(this.state)

 }
 handlePress() {
  console.log(this.state.uLongitude)
  getAll(this.state.uLongitude, this.state.uLatitude)
 }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.citibikeStops && this.state.busStops & this.state.subwayStops, this.state.parkingASP) {
    return (
      <View style={styles.container}>
{/*        <View style={styles.greeting}>
        <TouchableOpacity
          onPress={() => navigate('Details')}
         
          title= "Details" >
          <Text style={{fontSize: 24, color: 'white'}}>
            NYC Transport Options
          </Text>
        </TouchableOpacity>
        </View>  */}
        <View > 
          <View style = {styles.searchBarInput}>
            <TextInput 
              style={{textAlign: 'center', fontSize: 20, color: 'black', backgroundColor: 'white'}}
              placeholder="Madison Square Garden"
            />
        </View>
        </View>
          <View style={styles.resultsContainer}>
            <TouchableOpacity onPress={() => this.handlePress()} > 
              <View style={styles.card}>
             
                <Text style={styles.cardTitle}>Subways</Text>
                <Text style={styles.cardText}>Subway Stations  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.subwayStops.length}</Text></Text>
                <Text style={styles.cardText}>Nearest Station  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.subwayStops[0].properties.stop_name}</Text></Text>
                <Text style={styles.cardText}>Distance  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.subwayStops[0].distance.dist.toFixed(2)} miles</Text></Text>
              </View>
            
            </TouchableOpacity> 
            <TouchableOpacity  > 
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Citibike</Text>
                <Text style={styles.cardText}>Bike Stations<Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>   {this.state.citibikeStops.length}</Text></Text>
                <Text style={styles.cardText}>Nearest Station  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>  {this.state.citibikeStops[0].properties.stationName}</Text></Text>
                <Text style={styles.cardText}>Distance  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>   {this.state.citibikeStops[0].distance.dist.toFixed(2)} miles</Text></Text>
                <Text style={styles.cardText}>Available Bikes<Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>   {this.state.citibikeStops[0].properties.availableBikes}</Text></Text>
              </View>
            </TouchableOpacity>             
            <TouchableOpacity  > 
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Busses</Text>
                <Text style={styles.cardText}>Bus Stops<Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.busStops.length}</Text></Text>
                <Text style={styles.cardText}>Nearest Stop  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.busStops[0].name}</Text></Text>
                <Text style={styles.cardText}>Route Name<Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.busStops[0].routes[0].longName}</Text></Text>

              </View>
            </TouchableOpacity> 
            <TouchableOpacity> 
              <View style={styles.card}>                
                <Text style={styles.cardTitle}>Street Parking</Text>
                <Text style={styles.cardText}>ASP Spaces (Approx)<Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>   {this.state.parkingASP.length*4}</Text></Text>
                <Text style={styles.cardText}>ASP Nearest  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.parkingASP[0].properties.T}</Text></Text>
                <Text style={styles.cardText}>Meters  <Text style={{textAlign: 'right', color: 'white', fontWeight: 'bold'}}>{this.state.parkingMeters.length}</Text></Text>

              </View> 
            </TouchableOpacity>   
      
          </View>
      </View>
    ) 
  } else {
    return (
      <View><Text>Waiting ...</Text></View>
      )}
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
    flex: .06,
    backgroundColor:'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
// --------------------- searchbar parent
    searchBar: {

    flex: .08,
    justifyContent: 'center',
    backgroundColor:'gray',
  },
    searchBarInput: {
     height: 32,
     paddingTop:4,
     marginTop: 24,
     paddingBottom:4,
     backgroundColor: 'white'
    },
// -------------------------results parent
    resultsContainer: {
 /*     marginTop:12,
      paddingTop:12,*/
      flex: .8,
      flexDirection: 'column',
    /*  flexWrap: 'wrap',*/
      backgroundColor: 'black'
    },
    card: {
      backgroundColor:'#03003F',
      height: 130,
 /*     width: 150,*/
      margin: 4,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardTitle: {
      fontSize: 18, 
      fontWeight: 'bold',
      color: 'white', 
      textAlign: 'center',
      paddingBottom: 8
    },
    cardText: {
      fontSize: 14, 
      fontWeight: 'bold',
      color: 'yellow', 
      paddingBottom: 8
    },
    innerCard: {
      alignItems: 'flex-start'
    }

});
const nyclocalytics = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: Details },
  headerMode: 'screen' 
});

AppRegistry.registerComponent('nyclocalytics', () => nyclocalytics);














