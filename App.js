
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  AsyncStorage,
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
import axios from 'axios'

export default class HomeScreen extends Component {
    static navigationOptions = {
      header: null
  };
  constructor(props) {
    super(props);
    this.state={
      input: null
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
/*    this.setMeta = this.setMeta.bind(this)*/
    this.handlePress = this.handlePress.bind(this)
/*    this.postMeta = this.postMeta.bind(this)*/
    this.getPlaces = this.getPlaces.bind(this)
    this.autoC = this.autoC.bind(this)
    this.handlePlacePress = this.handlePlacePress.bind(this)
  }
      handlePlacePress(id) {      
      return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
    /*  return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {*/
      }).then((respon) => {
        this.setState({
          details: respon,
          uLatitude: respon.data.result.geometry.location.lat,
          uLongitude: respon.data.result.geometry.location.lng,
          address: respon.data.result.formatted_address.split(",")[0] + ", " + respon.data.result.formatted_address.split(",")[1],
          uPlaceId: respon.data.result.place_id,

        }, () => {
                       getAll(this.state.uLongitude, this.state.uLatitude).then((response) => {  
             console.log(response)    
              this.setState({
                citibikeStops: response[0],
                subwayStops: response[1],
                parkingASP: response[2],
                busStops: response[3],
                parkingMeters: response[4],
                metrics: {  
                  properties: {
                    address: response[5].results[0].formatted_address,         
                    place_id: response[5].results[0].place_id,         
                    bikeLength: response[0].length, 
                    subwayLength: response[1].length,
                    ASPLength: response[2].length,
                    busLength: response[3].length,
                    metersLength: response[4].length,
                    bikeDist: response[0][0].distance.dist,
                    subwayDist: response[1][0].distance.dist
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [this.state.uLongitude, this.state.uLatitude]
                  }
                },
                 input:null,
                 autoResp: null                 
              })             
            })
        })
      })
    }
  autoC(inp) {
    if(this.state.autoResp) {
    return (
      <View>
        <FlatList 
          scrollEventThrottle={1}       
          data={inp} 
          renderItem={({item}) =>       
            <TouchableOpacity 
              style={{height: 30}}
              onPress={() => this.handlePlacePress(item.place_id)}      
              >
                <View style={{ height: 40}} >
                   <Text numberOfLines={1}style={{fontSize: 16,fontWeight: 'bold', color: 'white'}} >{item.description.split(",")[0] + "," + item.description.split(",")[1] +  "," + item.description.split(",")[2]  }</Text>
                </View>
            </TouchableOpacity>}
          keyExtractor={item => item.id}
        />
          <View style={{marginTop: 20}}> 
            <Text style={{color: 'yellow', textAlign: 'center', fontSize: 14, fontWeight: 'bold', paddingTop: 8}}>Tap on a place to see the nearest subway stations and next trains.</Text>
          </View>
        </View>
      )
    }
  }
 componentDidMount() {
/*              AsyncStorage.getItem('bLength').then((value) => {
              this.setState({
                bLength: value
              })
            }) */
  /*     AppState.addEventListener('change', this._handleAppStateChange);*/
      navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude]
            }, () => {
              
             getAll(this.state.uLongitude, this.state.uLatitude).then((response) => {  
             console.log(response)    
              this.setState({
                citibikeStops: response[0],
                subwayStops: response[1],
                parkingASP: response[2],
                busStops: response[3],
                parkingMeters: response[4],
                metrics: {  
                  properties: {
                    address: response[5].results[0].formatted_address,         
                    place_id: response[5].results[0].place_id,         
                    bikeLength: response[0].length, 
                    subwayLength: response[1].length,
                    ASPLength: response[2].length,
                    busLength: response[3].length,
                    metersLength: response[4].length,
                    bikeDist: response[0][0].distance.dist,
                    subwayDist: response[1][0].distance.dist
                  },
                  geometry: {
                    type: "Point",
                    coordinates: [this.state.uLongitude, this.state.uLatitude]
                  }
                }                 
              })             
            })
            })

        }.bind(this))    
 }
/*             setMeta(value)  {

   }*/
   getPlaces(place) {
     return axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + place + '&radius=50000&minLength=2&administrative_area_level_1=NewYork&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        }).then((resp) => {
          this.setState({
            autoResp: resp.data.predictions
          })
          console.log(resp)
        }).catch(function(error) {
       throw error
    }); 
  }
 handlePress() {
  console.log(this.state.metrics)
  
  getAll(this.state.uLongitude, this.state.uLatitude)
/*    AsyncStorage.setItem('bLength', this.state.bikeLength.toString());
    AsyncStorage.setItem('sLength', this.state.subwayLength.toString());
    AsyncStorage.setItem('ALength', this.state.ASPLength.toString());
    AsyncStorage.setItem('buLength', this.state.busLength.toString());
    AsyncStorage.setItem('mLength', this.state.metersLength.toString());
    AsyncStorage.setItem('uLong', this.state.uLongitude.toString());
    AsyncStorage.setItem('mLat', this.state.uLatitude.toString());*/
    /*axios.post('http://127.0.0.1:5000/api/meta/', { metrics: this.state.metrics })*/
    axios.post('https://subs-backend.herokuapp.com/api/meta/', { metrics: this.state.metrics })
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
              value={this.state.input}
              placeholder="Madison Square Garden"
              onChangeText={(text) => this.setState({input: text}, (text) => {this.getPlaces(this.state.input)})}                 
  
            />
        </View>
         <View style={styles.autoPlaces}>{this.autoC(this.state.autoResp)}</View>
        </View>
        <View><Text numberOfRows={1} style={{color: 'white'}}> {this.state.metrics.properties.address}</Text></View>
          <View style={styles.resultsContainer}>
            <TouchableOpacity onPress={() => this.handlePress(this.state.metrics)} > 
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
/*      marginTop:12,
      paddingTop:12,
      flex: .8,
      flexDirection: 'column',*/
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
    },
    autoPlaces: {
      flexGrow: .3,
    /*  width: this.state.width,*/
      marginTop:14,
      marginLeft: 14,
    },

});
const nyclocalytics = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: Details },
  headerMode: 'screen' 
});

AppRegistry.registerComponent('nyclocalytics', () => nyclocalytics);














