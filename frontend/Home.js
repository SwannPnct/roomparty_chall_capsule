import React, { useState } from 'react'
import {styles,socket} from './App'
import {View} from 'react-native'
import {Input, Button} from 'react-native-elements'
import { Fontisto } from '@expo/vector-icons'

export default function Home(props) {

    const [pseudo, setPseudo] = useState(null)

    const handleAccessChat = () => {
        if (pseudo) {
            socket.emit("savePseudo", pseudo)
            props.navigation.navigate('ChatFamily')
        }
    }

    return (
        <View style={styles.container}>
            <Input placeholder="pseudo" value={pseudo} onChangeText={(e) => setPseudo(e)} inputStyle={styles.input} leftIcon={<Fontisto name="user-secret" size={24} color="black" />}/>
            <Button title="Family" buttonStyle={styles.button} onPress={() => handleAccessChat()}/>
        </View>
    )
}