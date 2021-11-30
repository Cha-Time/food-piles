import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";

export const SignUpPartThree = ({ navigation }) => {

    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zip, setZip] = useState(null);
    const [description, setDescription] = useState(null);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Tell us about yourself.</Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                    <TextInput placeholder='Name' value={name} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Phone' value={phone} style={[styles.textInput, { marginBottom: '5%' }]} />
                    <TextInput placeholder='Address' value={address} style={[styles.textInput, { marginBottom: '1%' }]} />
                    <View style={{ display: 'flex', flexDirection: 'row', maxWidth: '75%', minHeight: '10%', maxHeight: '13%', alignItems: 'center', marginBottom: '5%' }}>
                        <TextInput placeholder='City' value={city} style={[styles.textInput, { marginRight: '1%' }]} />
                        {/* <Picker selectedValue={state} onValueChange={currentSelection => setState(currentSelection)} style={{ backgroundColor: 'whitesmoke', width: '24%', minHeight: '91%', maxHeight: '13%' }}>
                            <Picker.Item label='PA' value='PA' />
                            <Picker.Item label='MD' value='MD' />
                        </Picker> */}

                    </View>
                    <TextInput placeholder='Description' value={description} style={[styles.textInput, { marginBottom: '5%', minHeight: '25%', textAlignVertical: 'top' }]} />

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Button title='< Back' name='back' onPress={() => navigation.navigate('SignUpPartTwo')}></Button>
                    <Button title='Next >' name='next' onPress={() => navigation.navigate('SignUpPartFour')}></Button>
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

export default SignUpPartThree