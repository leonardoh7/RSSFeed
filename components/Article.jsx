import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

const Article = props => {
    const [url, setUrl] = useState('');
    const {navigation, route} = props;
    useEffect(() => {
        if (route.params?.url) {
            setUrl(route.params?.url);
            
        }
      }, [route.params?.url]);
    return (
            <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
        );
}

export default Article;