import React from 'react'
import { View } from 'react-native'
import { webView } from 'react-native-webview'

function Profile({ navigation }) {
    const github_username = navigation.getParam('github_username')
    return <webView style={{ flex: 1 }} source={{ uri: `https://github.com/${github_username}` }} />
}

export default Profile