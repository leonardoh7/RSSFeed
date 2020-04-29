import React, { useEffect, useLayoutEffect, useReducer, useMemo } from 'react';
import { View, TextInput, Text, StyleSheet, Modal, FlatList, Button } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import ChanelListItem from "./ChannelListItem";
import { auth } from '../FirebaseConfig';
import { retrieveChanels } from '../functions/db';

const ChannelList = props => {
    const initialState = {
        chanelList: [],
        message: '',
        connecting: false,
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const {chanelList, message, connecting} = state;
    const {navigation, route} = props;


  const currentUser = useMemo(() => {
    return auth.currentUser;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <View style={styles.headerButtons}>
        <FontAwesome.Button name="plus" color={Platform.OS === 'android' ? 'white' : 'blue'} onPress={() => navigation.navigate("AddChanel")}/>
        <Button
            title="Sign out"
            titleStyle={{color: Platform.OS === 'android' ? 'white' : 'blue'}}
            onPress={handleSignout}
        />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    retrieveChanels(currentUser.uid).onSnapshot(function (docs) {
        let arr = [];
        docs.forEach(doc => {
            arr.push({...doc.data(), key: doc.id});
        });
        setState({chanelList: arr});
    });
  },[]);

    const chanelViewDetailHandler = chanelID => {
        let selectedChanel = chanelList.find((chanel) => chanel.key === chanelID);
        props.navigation.navigate('Feed', { chanel: selectedChanel });
    };

    const handleSignout = () => {
        auth.signOut().then(function () {
            // if logout was successful
            if (!auth.currentUser) {
                props.navigation.navigate('Login');
            }
          });
    }

    return (
      <View style={styles.screen}>
         { chanelList.length == 0 &&
        <View style={styles.norss}>
          <Text size={50}>Oops, No RSS found</Text>
          <Button
            title="Add RSS"
            icon={{ name: "add", color: "#fff" }}
            onPress={() => navigation.navigate("AddChanel")}
            iconContainerStyle={{ marginRight: 50 }}
            buttonStyle={{ justifyContent: "flex-start", width: 200, marginTop: 10 }}
          />
        </View>
        }
        <FlatList
          style={styles.list}
          data={chanelList}
          renderItem={(itemData) => (
            <ChanelListItem
              id={itemData.item.key}
              onRssPress={chanelViewDetailHandler}
              item={itemData.item}
            />
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    screen: { padding: 30 },
    list: {
      height: "90%"
    },
    norss: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%"
    },
    headerButtons: {
       flexDirection: "row" 
    }
});

export default ChannelList;