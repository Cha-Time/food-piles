import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Picker } from '@react-native-picker/picker';

export const SignUpPartTwo = ({ navigation }) => {

    const [userType, setUsertype] = useState('Donor');


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
                <Button title='< Back' name='back' onPress={() => navigation.navigate('SignUpPartOne')}></Button>
                <Button title='Next >' name='next' onPress={() => navigation.navigate('SignUpPartThree')}></Button>
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

export default SignUpPartTwo