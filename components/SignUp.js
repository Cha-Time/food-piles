import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const SignUp = ({ navigation }) => {

    ////// Sign Up Part One
    const [part, setPart] = useState('partOne');
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    ////// Sign Up Part Two
    const [userType, setUsertype] = useState('Donor');

    ////// Sign Up Part Three
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zip, setZip] = useState(null);
    const [description, setDescription] = useState(null);

    function handleSubmit() {
        await dispatch(authenticate(username, password, 'signup'))
        navigation.navigate('Welcome')
    }

    if (part === 'partOne') {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container} >
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Let's get you started.</Text>
                    <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                        <TextInput placeholder='Username' value={username} onChangeText={setUsername} style={[styles.textInput, { marginBottom: '5%' }]} />
                        <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={[styles.textInput, { marginBottom: '5%' }]} />
                        <TextInput placeholder='Password' value={password} onChangeText={setPassword} style={[styles.textInput, { marginBottom: '5%' }]} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '75%' }}>
                        <Button title='Next >' name='next' onPress={() => setPart('partTwo')}></Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    else if (part === 'partTwo') {
        return (
            <View style={styles.container} >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Who are you?</Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Picker selectedValue={userType} onValueChange={currentSelection => setUsertype(currentSelection)} style={{ backgroundColor: 'whitesmoke', width: '100%' }}>
                        <Picker.Item label='Donor' value='Donor' style={{}} />
                        <Picker.Item label='Charity' value='Charity' />
                    </Picker>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Button title='< Back' name='back' onPress={() => setPart('partOne')}></Button>
                    <Button title='Next >' name='next' onPress={() => setPart('partThree')}></Button>
                </View>
            </View>
        )
    }
    else if (part === 'partThree') {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container} >
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Tell us about yourself.</Text>
                    <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >
                        <TextInput placeholder='Name' value={name} onChangeText={setName} style={[styles.textInput, { marginBottom: '5%' }]} />
                        <TextInput placeholder='Phone' value={phone} onChangeText={setPhone} style={[styles.textInput, { marginBottom: '5%' }]} />
                        <TextInput placeholder='Address' value={address} onChangeText={setAddress} style={[styles.textInput, { marginBottom: '1%' }]} />
                        <View style={{ display: 'flex', flexDirection: 'row', maxWidth: '75%', minHeight: '10%', maxHeight: '13%', alignItems: 'center', marginBottom: '5%' }}>
                            <TextInput placeholder='City' value={city} onChangeText={setCity} style={[styles.textInput, { marginRight: '1%' }]} />
                            {/* <Picker selectedValue={state} onValueChange={currentSelection => setState(currentSelection)} style={{ backgroundColor: 'whitesmoke', width: '24%', minHeight: '91%', maxHeight: '13%' }}>
                                <Picker.Item label='PA' value='PA' />
                                <Picker.Item label='MD' value='MD' />
                            </Picker> */}

                        </View>
                        <TextInput placeholder='Description' value={description} onChangeText={setDescription} style={[styles.textInput, { marginBottom: '5%', minHeight: '25%', textAlignVertical: 'top' }]} />

                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <Button title='< Back' name='back' onPress={() => setPart('partTwo')}></Button>
                        <Button title='Next >' name='next' onPress={() => setPart('partFour')}></Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    else if (part === 'partFour') {
        return (
            <View style={styles.container} >
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Prove it.</Text>
                <View style={{ width: '100%', minHeight: '10%', alignItems: 'center', justifyContent: 'space-between' }} >

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Button title='< Back' name='back' onPress={() => setPart('partThree')}></Button>
                    <Button title='Next >' name='next' onPress={() => handleSubmit()}></Button>
                </View>
            </View>
        )
    }
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

export default SignUp