import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import Header from './components/common/Header'
import LoginForm from './components/LoginForm';
import Button from './components/common/Button';
import Spinner from './components/common/Spinner'
import CardSection from './components/common/CardSection';

class App extends Component
{
    state = {
        loggedIn: null
    }

    componentWillMount()
    {
        firebase.initializeApp({
            apiKey: "AIzaSyB6IJOg_MUc45tLAwYEuYUnnMV3nFGU62Q",
            authDomain: "authentication-c7dfd.firebaseapp.com",
            databaseURL: "https://authentication-c7dfd.firebaseio.com",
            projectId: "authentication-c7dfd",
            storageBucket: "authentication-c7dfd.appspot.com",
            messagingSenderId: "988486562973"
        })

        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    this.setState({loggedIn: true})
                } else {
                    this.setState({loggedIn: false})
                }
            })
    }

    renderContent()
    {

        switch (this.state.loggedIn) {
            case true:
                return <Button onPress={()=>firebase.auth().signOut()}>Log Out</Button>
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size='large'/>;
        }

    }

    render()
    {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        )

    }
}

export default App;