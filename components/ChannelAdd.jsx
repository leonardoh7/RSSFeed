import React, { useEffect, useState, useMemo } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal, Alert } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import { addChanel } from '../functions/db';
import { auth } from '../FirebaseConfig';
import { FontAwesome } from "@expo/vector-icons";

const ChannelAdd = props => {
    const [rssLink, setRssLink] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [openedQR, setOpenedQR] = useState(false);

    const currentUser = useMemo(() => {
        return auth.currentUser;
    });

    const fetchRss = async () => {
        try {
            await fetch(rssLink)
                            .then((response) => response.text())
                            .then(async (responseData) => {
                                const rss = await rssParser.parse(responseData);
                                let newItem = [];
                                addChanel(currentUser.uid ,{title: rss.title, description: rss.description, url: rssLink});
                                playSavedSound();
                                Alert.alert('Info', "Added successfully");
                                props.navigation.navigate('Main');
                            });
        } catch (error) {
            console.log(error);
            Alert.alert(`Problem loading server data - ${error.message}`);
            setAddSucceed(false);
        }
    }

    const handleRssLink = val => {
        setRssLink(val);
    };

    const handleSave = async () => {
        //save to db or file system
        if (rssLink.length > 7) {
            await fetchRss();
        } else {
            Alert.alert('Please input RSS Link');
        }
    };




    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <TextInput placeholder="RSS Link" style={styles.input} onChangeText={handleRssLink} value={rssLink} />
            </View>
            { !openedQR &&
                <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Cancel" color="red"  onPress={() => {props.navigation.navigate('Main');}} /></View>
                        <View style={styles.button}><Button title="Save"  onPress={handleSave}></Button></View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    inputContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    input: { 
        width: '80%', 
        borderColor: 'black', 
        borderWidth: 1, 
        padding: 10,
        marginRight: 10
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

export default ChannelAdd;