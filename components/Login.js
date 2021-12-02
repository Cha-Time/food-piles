import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { authenticate } from '../store/auth'
import { useDispatch, useSelector } from "react-redux";

export const Login = ({ navigation }) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSubmit() {
        await dispatch(authenticate(username, password))
        navigation.navigate('Welcome')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                <Text style={{ textAlign: 'center' }}>"Be the change that you want to see in the world" - Bruno Mars </Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                    <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={[styles.textInput, { marginBottom: '10%' }]} />
                    <Button title='Login' style={{ margin: '50px' }} onPress={() => handleSubmit()}></Button>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'center', marginBottom: 10 }}>"Don't have an account?</Text>
                    <Button title='Sign Up' name='signUp' onPress={() => navigation.navigate('SignUp')}></Button>
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