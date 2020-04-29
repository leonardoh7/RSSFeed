import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
const ChannelListItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onRssPress.bind(this, props.id)}>
            <View style={styles.listItem} >
                <Text style={styles.name}>{props.item.title}</Text>
                <Text>{props.item.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: { 
        padding: 10, 
        marginVertical: 10, 
        backgroundColor: 'white', 
        borderBottomColor: 'grey', 
        borderBottomWidth: 0.5
    },
    name: {
        fontSize: 20,
        color: 'black'
    }
})

export default ChannelListItem;