import { Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ChanelList from '../components/ChannelList';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{
                    gestureEnabled: true
                  }}
            >
                <Stack.Screen 
                    name="Login" 
                    component={Login}
                    options={{
                        headerTitle: 'Login',
                        headerTitleAlign: 'center',
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue'
                    }}
                />
                <Stack.Screen 
                    name="SignUp"
                    component={SignUp}
                    options={{
                        headerTitle: 'SignUp',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue'
                    }}
                />
                <Stack.Screen 
                    name="Main"
                    component={ChanelList}
                    options={{
                        headerTitle: 'Chanel List',
                        headerTitleAlign: 'center',
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;