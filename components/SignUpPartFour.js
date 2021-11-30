import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";

export const SignUpPartFour = ({ navigation }) => {

    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zip, setZip] = useState(null);
    const [description, setDescription] = useState(null);

    return (
            <View style={styles.container} >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Prove it.</Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Button title='< Back' name='back' onPress={() => navigation.navigate('SignUpPartThree')}></Button>
                    <Button title='Next >' name='next' onPress={() => navigation.navigate('Welcome')}></Button>
                </View>
            </View>
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

export default SignUpPartFour