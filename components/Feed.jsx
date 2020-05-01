import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, StyleSheet, FlatList, Alert, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FeedItem from "./FeedItem";
import * as rssParser from 'react-native-rss-parser';


const Feed = props => {
  const [chanelItem, setChanel] = useState({});
  const [articles, setArticles] = useState([]);
  const {navigation, route} = props;

  useEffect(() => {
    if (route.params?.chanel) {
        setChanel(route.params?.chanel);
        fetchRss(route.params?.chanel.url);
    }
  }, [route.params?.chanel]);

  const fetchRss = async (url) => {
    try {
        await fetch(url)
                        .then((response) => response.text())
                        .then(async (responseData) => {
                            const rss = await rssParser.parse(responseData);
                            let newItem = [];
                            setArticles(rss.items);
                        });
    } catch (error) {
        console.log(error);
        Alert.alert(`Problem loading server data - ${error.message}`);
    }
}

  const showArticle = (links, title) => {
    links.map(l => {
        props.navigation.navigate('ArticleDetail', { url: l.url, title: title });
    });
  };


  return (
    <View style={styles.screen}>
      
      <FlatList
        style={styles.list}
        data={articles}
        renderItem={itemData => (
          <FeedItem
            onArticlePress={showArticle}
            item={itemData.item}
          />
        )}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  screen: { padding: 30 },
  list: {
    height: "90%"
  }
});
