import React, { useState } from 'react'
import {styles,socket,rooms} from './App'
import {View, Text} from 'react-native'
import {Input, Button} from 'react-native-elements'
import { Fontisto } from '@expo/vector-icons'

export default function Home(props) {

    const [pseudo, setPseudo] = useState(null)
    const [hasChosenPseudo, setHasChosenPseudo] = useState(false)

    const handleAccessChat = (room) => {
        if (pseudo) {
            socket.emit("goRoom", {pseudo,room})
            setHasChosenPseudo(true)
            props.navigation.navigate(room)
        }
    }

    return (
        <View style={styles.container}>
            {hasChosenPseudo? <Text>Your pseudo is {pseudo}</Text>:<Input placeholder="pseudo" value={pseudo} onChangeText={(e) => setPseudo(e)} inputStyle={styles.input} leftIcon={<Fontisto name="user-secret" size={24} color="black" />}/>}
            {rooms.map((e) => (
                <Button title={e} buttonStyle={styles.button} onPress={() => handleAccessChat(e)}/>
            ))}
        </View>
    )
}