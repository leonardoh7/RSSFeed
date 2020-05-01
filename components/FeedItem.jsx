import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FeedItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onArticlePress.bind(
        this,
        props.item.links,
        props.item.title
      )}
    >
      <View style={styles.listItem}>
        <Text style={styles.name}>
          {props.item.image} {props.item.title}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 20,
  },
});

export default FeedItem;
