import { Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';


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
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;