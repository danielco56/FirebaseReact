import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Input from './common/Input';
import Spinner from './common/Spinner';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    OnButtonPressed()
    {
        const {email, password} = this.state;

        this.setState({error: '', loading: true})

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
                
            })
    }

    onLoginSuccess()
    {
        this.setState({email: '', password: '', loading: false, error: ''})
    }

    onLoginFail()
    {
        this.setState({error: 'Authentication Failed!', loading: false})
    }

    renderButton()
    {
        if (this.state.loading) {
            return <Spinner style='small'/>
        }
        return (
            <Button
                onPress={this
                .OnButtonPressed
                .bind(this)}>Login</Button>
        )
    }

    render()
    {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Email:'
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}></Input>
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label='Password:'
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}></Input>
                </CardSection>
                <Text style={styles.errorStyle}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorStyle: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'center'

    }
}

export default LoginForm;
