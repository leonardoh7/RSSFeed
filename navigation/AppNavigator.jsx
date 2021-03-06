import { Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ChanelList from '../components/ChannelList';
import ChanelAdd from '../components/ChannelAdd';
import Feed from '../components/Feed';
import Article from "../components/Article";

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
                <Stack.Screen 
                    name="AddChanel"
                    component={ChanelAdd}
                    options={{
                        headerTitle: 'Add a new RSS/Chanel',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue'
                    }}
                />
                <Stack.Screen 
                    name="Feed"
                    component={Feed}
                    options={({ route }) => ({
                        headerTitle: route.params?.chanel.title,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTitleStyle: {
                            paddingLeft: 25
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue' 
                    })}
                />
                <Stack.Screen 
                    name="ArticleDetail"
                    component={Article}
                    options={({ route }) => ({
                        headerTitle: route.params?.title,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? 'blue' : ''
                        },
                        headerTitleStyle: {
                            fontSize: 18,
                            paddingLeft: 25
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : 'blue' 
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;