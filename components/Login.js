import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";

export const Login = ({ navigation }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                <Text style={{ textAlign: 'center' }}>"Be the change that you want to see in the world" - Bruno Mars </Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                    <TextInput placeholder='Username' value={username} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Password' value={password} style={[styles.textInput, { marginBottom: '10%' }]} />
                    <Button title='Login' style={{ margin: '50px' }} onPress={() => navigation.navigate(/* Screen Name Here */)}></Button>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'center', marginBottom: 10 }}>"Don't have an account?</Text>
                    <Button title='Sign Up' name='signUp' onPress={() => navigation.navigate('SignUpPartOne')}></Button>
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

export default Login