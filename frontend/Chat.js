import React, { useEffect, useState } from 'react'
import {styles,socket} from './App'
import {View,Text, KeyboardAvoidingView, ScrollView} from 'react-native'
import {Input, ListItem, Button} from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Chat(props) {

    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState(null)

    const generateMessages = messages.map((e,i) => (
        <ListItem key={i} bottomDivider style={styles.list}>
        <ListItem.Content>
          <ListItem.Title>{e}</ListItem.Title>
          
        </ListItem.Content>
      </ListItem>
    ))

    const handleSendMessage = () => {
        socket.emit("sendMessage", currentMessage)
        setCurrentMessage(null)
    }

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages([...messages, msg])
        })
    },[messages])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "flex-start", alignItems:"center", paddingTop: 40}}>
                {generateMessages.length > 0 ? generateMessages : <Text>Wow, such empty</Text>}
            </ScrollView>
            <KeyboardAvoidingView behavior="padding" style={{ width: "100%", justifyContent: "flex-end", alignItems: "center", paddingBottom: 40}}>
                <Input placeholder="message" inputStyle={styles.input} value={currentMessage} onChangeText={(e) => setCurrentMessage(e)}/>
                <Button buttonStyle={styles.button} title=" Send" icon={<MaterialCommunityIcons name="message-text-outline" size={24} color="black" />} onPress={() => handleSendMessage()}/>
            </KeyboardAvoidingView>
        </View>
    )
}