import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseDb from './src/lib/FirebaseLiveDB';
import { Button, TouchableOpacity} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickerState: ''
    }

    // Bind event listeners
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    // Store the reference to the clicker state from the database
    let clickerStateRef = firebaseDb.ref('clicker_state');
    this.setState({
      clickerStateRef: clickerStateRef
    });

    // Set up listener for changes to the clicker state
    clickerStateRef.on('value', updates => {
      this.setState({
        clickerState: updates.val()
      })
    });

  }

  next() {
    this._setClickerState('next');
  }

  previous() {
    this._setClickerState('previous');
  }

  _setClickerState(state) {
    this.state.clickerStateRef.set(state, error => {
      if (error) {
        console.log('ERROR: ' + error)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Current State: {this.state.clickerState}</Text>
          <View style={styles.previousContainer}>
            <TouchableOpacity style={styles.touchableArea} onPress={this.previous}>
              <Text style={styles.buttonText}>
                Previous  
              </Text>  
            </TouchableOpacity>
          </View>
          <View style={styles.nextContainer}>
            <TouchableOpacity style={styles.touchableArea} onPress={this.next}>
              <Text style={styles.buttonText}>
                Next
              </Text>  
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // flex: 1, specifies how much of the parent container the element should take up
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  previousContainer: {
    flex: .5,
    backgroundColor: 'rgb(82, 119, 178)',
  },
  nextContainer: {
    flex: .5,
    backgroundColor: 'rgb(36, 43, 53)',
  },
  touchableArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  buttonText: {
    fontSize: 60,
    color: 'white',
  }
});
