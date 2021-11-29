import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";

export const SignUpPartOne = ({ navigation }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Let's get you started.</Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                    <TextInput placeholder='Username' value={username} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Email' value={email} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Password' value={password} style={[styles.textInput, { marginBottom: '5%' }]} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '75%' }}>
                    <Button title='Next >' name='next' onPress={() => navigation.navigate('SignUpPartTwo')}></Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        flexDirection: 'column',
        backgroundColor: '#93c47d',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    },
    textInput: {
        backgroundColor: 'whitesmoke',
        color: 'black',
        width: '75%'
    }
})

export default SignUpPartOne