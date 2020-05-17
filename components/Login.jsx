import React, { useEffect, useReducer } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal, Alert } from 'react-native';
import { auth } from '../FirebaseConfig'
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';

const Login = props => {
    const initialState = {
        userName: "",
        password: ""
      };
      const reducer = (state, newState) => ({ ...state, ...newState });
      const [state, setState] = useReducer(reducer, initialState);

      useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            props.navigation.navigate('Main');
        }
    })
      }, []);

      const handleUsername = val => {
        setState({ userName: val });
      };

      const handlePassword = val => {
        setState({ password: val });
      }

      const handleSignInWithEmail = async () => {
        if (state.userName.length < 4) {
            Alert.alert('Please enter an email address.');
            return;
          }
      
          if (state.password.length < 4) {
            Alert.alert('Please enter a password.');
            return;
          }
      
          await auth.signInWithEmailAndPassword(state.userName, state.password)
            .then(function (_firebaseUser) {
              setState({userName: "", password: ""})
              props.navigation.navigate('Main');
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
      
              if (errorCode === 'auth/wrong-password') {
                Alert.alert('Wrong password.');
              }
              else {
                Alert.alert(errorMessage);
              }
            }
            );
        };

        const handleSignInWithFB = async () => {
          try {
            await Facebook.initializeAsync("253383302475223");
            const {
              type,
              token,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ["public_profile"],
            });

            if (type === "success") {
              // Build Firebase credential with the Facebook access token.
              const credential = firebase.auth.FacebookAuthProvider.credential(
                token
              );
              console.log(credential);
              // Sign in with credential from the Facebook user.
              auth
                .signInWithCredential(credential)
                .then(function (result) {
                  console.log(result);
                  props.navigation.navigate("Main");
                })
                .catch(function (error) {
                  console.log(error.code);
                  console.log(error);
                });
            }
          } catch ({ message }) {
            console.log(message);
          }
        };

    return (
        <View style={styles.inputContainer}>
            <TextInput placeholder="Username" style={styles.input} onChangeText={handleUsername} value={state.userName} />
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={handlePassword} value={state.password} />
            
            <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Login"  onPress={handleSignInWithEmail} /></View>
                    <View style={styles.button}><Button title="Sign Up"  onPress={() => {props.navigation.navigate('SignUp');}}></Button></View>
            </View>
            <Text>Or</Text>  
            <View>
                <FontAwesome.Button name="facebook-official" onPress={handleSignInWithFB}>
                    Continue with Facebook
                </FontAwesome.Button>
                <FontAwesome.Button name="google" backgroundColor="red">
                    Continue with Google
                </FontAwesome.Button>
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

export default Login;