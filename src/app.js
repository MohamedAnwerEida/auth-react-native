import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, CardSection, Card, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: false };
  componentWillMount() {
    this.initializeFirebase();
  }
  initializeFirebase() {
    const firebase = require('firebase');

    // Initialize Firebase
    var config =
    {
      apiKey: 'AIzaSyC6KUGTMce15KpJUxMG59dRf8N_rLJZHDQ',
      authDomain: 'authentication-164bb.firebaseapp.com',
      databaseURL: 'https://authentication-164bb.firebaseio.com',
      projectId: 'authentication-164bb',
      storageBucket: 'authentication-164bb.appspot.com',
      messagingSenderId: '48326044623'
    };
    firebase.initializeApp(config);

    //inicializando o firestore
    const firestore = require("firebase/firestore");
    db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    const firebase = require('firebase');
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header HeaderText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
