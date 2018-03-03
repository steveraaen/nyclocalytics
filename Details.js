
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';


type Props = {};
export default class Details extends Component<Props> {
    static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.titleText}>
          hellooo
        </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
    flex: 1,
    height: 400,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',

  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
