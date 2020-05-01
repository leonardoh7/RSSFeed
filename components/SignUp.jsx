import React, { useEffect, useReducer } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal, Alert} from 'react-native';
import { auth } from '../FirebaseConfig';

const SignUp = props => {
    const initialState = {
        userName: "",
        password: "",
        confirmPass: ""
      };
      const reducer = (state, newState) => ({ ...state, ...newState });
      const [state, setState] = useReducer(reducer, initialState);

      const handleUsername = val => {
        setState({ userName: val });
      };

      const handlePassword = val => {
        setState({ password: val });
      }

      const handleRegister = () => {
        if (state.userName.length < 4) {
            Alert.alert('Please enter an email address.');
            return;
          }
      
          if (state.password.length < 4) {
            Alert.alert('Please enter a password.');
            return;
          }
      
          auth.createUserWithEmailAndPassword(state.userName, state.password)
            .then(function (_firebaseUser) {
                setState({userName: "", password: ""});
                Alert.alert('Register succesfully');
                props.navigation.navigate('Main');
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
      
              if (errorCode == 'auth/weak-password') {
                Alert.alert('The password is too weak.');
              }
              else {
                Alert.alert(errorMessage);
              }
              console.log(error);
            }
            );
        
      }

    return (
        <View style={styles.inputContainer}>
            <TextInput placeholder="Username" style={styles.input} onChangeText={handleUsername} value={state.userName} />
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={handlePassword} value={state.password} />
            <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Cancel" color="red"  onPress={() => {props.navigation.navigate('Login');}} /></View>
                    <View style={styles.button}><Button title="Register"  onPress={handleRegister}></Button></View>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    input: { 
        width: '100%', 
        borderColor: 'black', 
        borderWidth: 1, 
        padding: 10,
        marginBottom: 10,
    },  
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    button: {
        width: '40%',
    }    
});

export default SignUp;